use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Token};
use anchor_lang::solana_program::hash::hash;

declare_id!("ALockMsgXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

#[program]
pub mod airlock_messaging {
    use super::*;

    pub fn initialize_inbox(ctx: Context<InitializeInbox>, tier: ArchivalTier) -> Result<()> {
        let inbox = &mut ctx.accounts.inbox;
        inbox.owner = ctx.accounts.owner.key();
        inbox.message_count = 0;
        inbox.is_active = true;
        inbox.archival_tier = tier;
        Ok(())
    }

    pub fn send_message(
        ctx: Context<SendMessage>,
        content: String,
        message_type: MessageType,
        attachments: Vec<Attachment>,
        encryption_key: Option<[u8; 32]>,
        reply_to: Option<Pubkey>,
        expires_at: Option<i64>,
    ) -> Result<()> {
        // Verify sender has enough tokens
        let sender_balance = ctx.accounts.sender_token_account.amount;
        let required_balance = match message_type {
            MessageType::Partnership => 10_000,
            MessageType::General => 1_000,
            MessageType::Priority => 50_000,
            MessageType::ContractProposal => 50_000,
            MessageType::TermSheet => 50_000,
            MessageType::Confidential => 100_000,
        };

        require!(
            sender_balance >= required_balance,
            MessagingError::InsufficientTokens
        );

        let message = &mut ctx.accounts.message;
        let inbox = &mut ctx.accounts.recipient_inbox;

        message.sender = ctx.accounts.sender.key();
        message.recipient = ctx.accounts.recipient_inbox.owner;
        message.content = content;
        message.content_encryption_key = encryption_key;
        message.timestamp = Clock::get()?.unix_timestamp;
        message.message_type = message_type;
        message.attachments = attachments;
        message.is_read = false;
        message.is_archived = false;
        message.is_encrypted = encryption_key.is_some();
        message.reply_to = reply_to;
        message.expires_at = expires_at;
        message.archival_status = ArchivalStatus::Active;
        message.archive_date = None;
        message.deletion_date = None;

        inbox.message_count = inbox.message_count.checked_add(1)
            .ok_or(MessagingError::Overflow)?;

        emit!(MessageSent {
            message_id: message.key(),
            sender: message.sender,
            recipient: message.recipient,
            message_type,
            timestamp: message.timestamp,
        });

        Ok(())
    }

    pub fn archive_messages(
        ctx: Context<ArchiveMessages>,
        message_ids: Vec<Pubkey>,
        archive_type: ArchivalStatus,
    ) -> Result<()> {
        let inbox = &mut ctx.accounts.inbox;

        // Verify user has sufficient tokens for archival tier
        let token_balance = ctx.accounts.token_account.amount;
        let required_balance = match inbox.archival_tier {
            ArchivalTier::Standard => 1_000,
            ArchivalTier::Premium => 10_000,
            ArchivalTier::Enterprise => 100_000,
        };

        require!(
            token_balance >= required_balance,
            MessagingError::InsufficientTokens
        );

        // Process archival
        for message_id in message_ids {
            let message = &mut ctx.accounts.message;
            message.archival_status = archive_type;
            message.archive_date = Some(Clock::get()?.unix_timestamp);
            
            if archive_type == ArchivalStatus::Deleted {
                message.deletion_date = Some(Clock::get()?.unix_timestamp);
            }
        }

        Ok(())
    }

    // Additional message management functions
    pub fn mark_as_read(ctx: Context<UpdateMessage>) -> Result<()> {
        let message = &mut ctx.accounts.message;
        message.is_read = true;
        Ok(())
    }

    pub fn update_message_type(
        ctx: Context<UpdateMessage>,
        new_type: MessageType
    ) -> Result<()> {
        let message = &mut ctx.accounts.message;
        message.message_type = new_type;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeInbox<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,
        space = Inbox::LEN,
        seeds = [b"inbox", owner.key().as_ref()],
        bump
    )]
    pub inbox: Account<'info, Inbox>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SendMessage<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,

    #[account(
        mut,
        seeds = [b"inbox", recipient_inbox.owner.as_ref()],
        bump
    )]
    pub recipient_inbox: Account<'info, Inbox>,

    #[account(
        init,
        payer = sender,
        space = Message::LEN,
        seeds = [
            b"message",
            recipient_inbox.key().as_ref(),
            recipient_inbox.message_count.to_le_bytes().as_ref()
        ],
        bump
    )]
    pub message: Account<'info, Message>,

    pub sender_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        constraint = message.recipient == user.key() @ MessagingError::Unauthorized
    )]
    pub message: Account<'info, Message>,
}

#[derive(Accounts)]
pub struct ArchiveMessages<'info> {
    #[account(mut)]
    pub inbox: Account<'info, Inbox>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub message: Account<'info, Message>,
}

#[account]
pub struct Inbox {
    pub owner: Pubkey,
    pub message_count: u64,
    pub is_active: bool,
    pub archival_tier: ArchivalTier,
}

#[account]
pub struct Message {
    pub sender: Pubkey,
    pub recipient: Pubkey,
    pub content: String,
    pub content_encryption_key: Option<[u8; 32]>,
    pub timestamp: i64,
    pub message_type: MessageType,
    pub attachments: Vec<Attachment>,
    pub is_read: bool,
    pub is_archived: bool,
    pub is_encrypted: bool,
    pub reply_to: Option<Pubkey>,
    pub expires_at: Option<i64>,
    pub archival_status: ArchivalStatus,
    pub archive_date: Option<i64>,
    pub deletion_date: Option<i64>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum MessageType {
    General,
    Partnership,
    Priority,
    ContractProposal,
    TermSheet,
    Confidential,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum ArchivalTier {
    Standard,    // 30 days active storage
    Premium,     // 1 year active storage
    Enterprise,  // Unlimited storage
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum ArchivalStatus {
    Active,
    Archived,
    Compressed,
    Cold,        // Cold storage for very old messages
    Deleted,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Attachment {
    pub file_hash: [u8; 32],  // IPFS or Arweave hash
    pub file_type: String,    // MIME type
    pub file_name: String,
    pub file_size: u64,
    pub encryption_key: Option<[u8; 32]>,
}

#[event]
pub struct MessageSent {
    pub message_id: Pubkey,
    pub sender: Pubkey,
    pub recipient: Pubkey,
    pub message_type: MessageType,
    pub timestamp: i64,
}

#[error_code]
pub enum MessagingError {
    #[msg("Insufficient tokens to send message")]
    InsufficientTokens,
    #[msg("Not authorized to perform this action")]
    Unauthorized,
    #[msg("Arithmetic overflow")]
    Overflow,
}

impl Inbox {
    pub const LEN: usize = 8 + // discriminator
        32 + // owner
        8 + // message_count
        1 + // is_active
        1; // archival_tier
}

impl Message {
    pub const LEN: usize = 8 + // discriminator
        32 + // sender
        32 + // recipient
        1000 + // content (max 1000 chars)
        33 + // content_encryption_key
        8 + // timestamp
        1 + // message_type
        1000 + // attachments (Vec<Attachment>)
        1 + // is_read
        1 + // is_archived
        1 + // is_encrypted
        33 + // reply_to
        9 + // expires_at
        1 + // archival_status
        9 + // archive_date
        9; // deletion_date
}

