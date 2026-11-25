import { Callout } from 'fumadocs-ui/components/callout';
import Link from 'next/link';

/**
 * Canonical, single-source-of-truth USDC addresses surfaced in the docs.
 * (Spield's own contract addresses live in `components/contract-tables.tsx`.)
 *
 * Mainnet is Circle USDC. Testnet is Blend's own test USDC (the asset the Blend TestnetV2 pool
 * accepts); Circle's testnet USDC is a different asset and does not work with Spield's Blend series.
 */
export const USDC_ADDRESSES = {
  mainnet: {
    sac: 'CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZPUTHXSTZLEO7SJMI75',
    classic: 'USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
  },
  testnet: {
    sac: 'CAQCFVLOBK5GIULPNZRGATJJMIZL5BSP7X5YJVMGCPTUEPFM4AVSRCJU',
    classic: 'USDC:GATALTGTWIOT6BUDBCZM3Q4OQ4BO2COLOAZ7IYSKPLC2PMSOPPGF5V56',
  },
} as const;

/**
 * A short, reusable "where the protocol is" notice. Drop `<DevPhaseNote />`
 * into any page that talks about networks so the status message stays consistent everywhere.
 */
export function DevPhaseNote() {
  return (
    <Callout type="info" title="Where Spield is today">
      Spield v2 has been <strong>live on Stellar mainnet since September 2026</strong>. Each series
      has a fixed maturity, and both mainnet series so far (Series 1 and Series 2) have{' '}
      <strong>matured</strong>, so they are <strong>redeem-only</strong>: you can redeem PT, claim
      yield and redeem vault receipts, but not open new positions. New mainnet series are announced
      in the app. <strong>Testnet</strong> has live series you can use with free test funds, and the
      tokenized US Treasury (USTRY) series is <strong>testnet only</strong> for now. USDC addresses
      for both networks are listed on the{' '}
      <Link href="/docs/developers/addresses">Contract addresses</Link> page.
    </Callout>
  );
}
