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
      Spield v2 has been <strong>live on Stellar mainnet since September 2026</strong>. Three mainnet
      series are <strong>open</strong>, launched on 27 November 2026: <strong>Blend USDC Series
      3</strong> (30 days, matures 27 Dec 2026), <strong>USTRY Series 1</strong> (30 days, 27 Dec
      2026) and <strong>USTRY Series 2</strong> (60 days, 26 Jan 2027). Their pools are small at
      launch and Blend Series 3 caps deposits at 50 USDC, so check a quote before a large trade. The
      earlier Blend Series 1 and 2 have matured and are <strong>redeem-only</strong>.{' '}
      <strong>Testnet</strong> also has live series you can use with free test funds. Addresses for
      both networks are on the{' '}
      <Link href="/docs/developers/addresses">Contract addresses</Link> page.
    </Callout>
  );
}
