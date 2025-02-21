use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Token};

declare_id!("ALockVerXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

#[program]
pub mod airlock_verification {
    use super::*;

    pub fn initialize_kol(ctx: Context<InitializeKol>, name: String, x_handle: String) -> Result<()> {
        let kol = &mut ctx.accounts.kol;
        kol.owner = ctx.accounts.owner.key();
        kol.name = name;
        kol.x_handle = x_handle;
        kol.verified = false;
        kol.reputation_score = 0;
        kol.total_deals = 0;
        kol.successful_deals = 0;
        Ok(())
    }

    pub fn verify_kol(ctx: Context<VerifyKol>) -> Result<()> {
        let kol = &mut ctx.accounts.kol;
        
        // Verify token holdings
        let token_balance = ctx.accounts.token_account.amount;
        require!(token_balance >= 100_000, VerificationError::InsufficientTokens);
        
        kol.verified = true;
        
        emit!(KolVerified {
            kol_id: kol.key(),
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }

    pub fn update_reputation(ctx: Context<UpdateReputation>, score_delta: i64) -> Result<()> {
        let kol = &mut ctx.accounts.kol;
        
        // Update reputation score
        kol.reputation_score = kol.reputation_score.checked_add(score_delta)
            .ok_or(VerificationError::ArithmeticError)?;
        
        // Update deal metrics
        if score_delta > 0 {
            kol.successful_deals = kol.successful_deals.checked_add(1)
                .ok_or(VerificationError::ArithmeticError)?;
        }
        kol.total_deals = kol.total_deals.checked_add(1)
            .ok_or(VerificationError::ArithmeticError)?;
        
        emit!(ReputationUpdated {
            kol_id: kol.key(),
            new_score: kol.reputation_score,
            timestamp: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeKol<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    
    #[account(
        init,
        payer = owner,
        space = Kol::LEN,
        seeds = [b"kol", owner.key().as_ref()],
        bump
    )]
    pub kol: Account<'info, Kol>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyKol<'info> {
    #[account(mut)]
    pub kol: Account<'info, Kol>,
    
    pub token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct UpdateReputation<'info> {
    #[account(mut)]
    pub kol: Account<'info, Kol>,
}

#[account]
pub struct Kol {
    pub owner: Pubkey,
    pub name: String,
    pub x_handle: String,
    pub verified: bool,
    pub reputation_score: i64,
    pub total_deals: u64,
    pub successful_deals: u64,
}

#[event]
pub struct KolVerified {
    pub kol_id: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct ReputationUpdated {
    pub kol_id: Pubkey,
    pub new_score: i64,
    pub timestamp: i64,
}

#[error_code]
pub enum VerificationError {
    #[msg("Insufficient tokens for verification")]
    InsufficientTokens,
    #[msg("Arithmetic error")]
    ArithmeticError,
}

impl Kol {
    pub const LEN: usize = 8 + // discriminator
        32 + // owner
        (4 + 50) + // name (max 50 chars)
        (4 + 15) + // x_handle (max 15 chars)
        1 + // verified
        8 + // reputation_score
        8 + // total_deals
        8; // successful_deals
}

