'use client';

import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

/**
 * Spield's deployed contracts, one table per series. Each series is a separate set of contracts
 * with its own fixed maturity.
 *
 * Sources (kept in sync by hand, cross-checked against each other):
 *  - frontend `src/lib/series.ts` and `src/lib/config.ts` (the app's registry)
 *  - `@spield/sdk` `src/config.ts` and the signed hosted lists at
 *    https://www.spield.live/sdk/{mainnet,testnet}-series.json
 *  - mainnet launch records for Series 1 and Series 2
 *  - the USTRY Series 2 deployment JSON files (series and market)
 * Add a new series by appending to MAINNET_SERIES or TESTNET_SERIES below.
 */

type Net = 'mainnet' | 'testnet';
type Kind = 'contract' | 'asset' | 'account';
type Row = readonly [label: string, id: string, kind: Kind];

type Deployment = {
  /** Heading shown above the table. */
  name: string;
  /** The id `@spield/sdk` knows this series by, when it has one. */
  sdkId?: string;
  /** Maturity as a unix timestamp in seconds (UTC). */
  expiry: number;
  /** One line on what the series is. */
  note: string;
  rows: readonly Row[];
};

const EXPLORER: Record<Net, string> = {
  mainnet: 'https://stellar.expert/explorer/public',
  testnet: 'https://stellar.expert/explorer/testnet',
};

const MAINNET_USDC = 'CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZPUTHXSTZLEO7SJMI75';
const TESTNET_USDC = 'CAQCFVLOBK5GIULPNZRGATJJMIZL5BSP7X5YJVMGCPTUEPFM4AVSRCJU';

/** The Admin of every mainnet contract: a 2-of-3 multisig account. */
const MAINNET_ADMIN = 'GDJ66WMVVH6MWBL4KORY2HOXWLY4UGFCMP64RC474LUJPQCPQUC4RUFL';

const MAINNET_SERIES: readonly Deployment[] = [
  {
    name: 'Series 2',
    sdkId: 'mainnet-blend-2',
    expiry: 1793056349,
    note: 'Blend USDC, 15-day term, launch deposit cap 160 USDC, Fixed-Rate Vault rate 3.00%.',
    rows: [
      ['SR (Standardized Return)', 'CDTAPBUE2JWXT4F3PTAFQRYTLC6IF4K736ISGIFNLJQBC7AWAHPU6HWM', 'contract'],
      ['Yield (PT/YT engine, also the YT token)', 'CAALMLLE4COVQE33RTZOKKFJ3FYEAOONOAGKOUST26P23FE4HX5Q7XZB', 'contract'],
      ['SR Market (PT/SR AMM)', 'CC7UQOKGYQLYZY4RALIAPBA4IH2TOMEJENQ6OWWIOSTTUDRZ5VYUERIW', 'contract'],
      ['Fixed-Rate Vault', 'CA6TSYNLREIBJP37MD6LUPXKXHC6WB5ZK6YD3PTCQUDZ7XDJUD7AN66C', 'contract'],
      ['Router', 'CASPAY3DKWQQSZORJVEF44576OK3DODYOZQ74R4NLZT2YTVBNTO7RQNW', 'contract'],
      ['Strategy (Blend adapter)', 'CDD2HYLUHT2HWI2L2ZMYM4NYPFDZMYDDMYH2V6ZOE32G6KFZMQKKKA24', 'contract'],
      ['PT (SAC)', 'CALAMDCCXSBWPJWOKUH6CHVVQMBPLJBUU4GVPETHY2FLNZGXFI2FNYUB', 'contract'],
      ['PT classic asset', 'SPLDPT-GBBRKYFRHSDUQ3YQRIFR42GZ4OKFMVKCZN7JYFPESVNSRU3WEE4JPI7Q', 'asset'],
      ['USDC (Circle SAC)', MAINNET_USDC, 'contract'],
    ],
  },
  {
    name: 'Series 1',
    sdkId: 'mainnet-blend-1',
    expiry: 1790809749,
    note: 'Blend USDC, 30-day term, launch deposit cap 50 USDC, Fixed-Rate Vault rate 3.00%.',
    rows: [
      ['SR (Standardized Return)', 'CCOZ2JGQAPLUOG5RVU3TLPGSS7WA356BWCOEWFBJU44DKHDRZTQPABBS', 'contract'],
      ['Yield (PT/YT engine, also the YT token)', 'CDILIYN4IXUL5H7PJ4TW3GLZ2U6LIZYX35SNN4BGYZWPIXFLJZEFMRLP', 'contract'],
      ['SR Market (PT/SR AMM)', 'CDRQJ7EYKTJV3W4BE2U4HIAWSVZB675MHTCBDGCXMKVR5VCURMNSEZ7O', 'contract'],
      ['Fixed-Rate Vault', 'CDNRQ4YLW4RA4LB4J4M5S3X4SEXXR3Z6TR7336VKOG3FPX3PBFAMVZ6P', 'contract'],
      ['Router', 'CB7O72TTK7OISNS53HXTLCZ2EAY2F5KKYBPGI7ADSIX5KMPGVVDXAALN', 'contract'],
      ['Strategy (Blend adapter)', 'CAJKHGY3J2XSZHI3TFDFMXJ2GDFFUPUPPTUOP6UOBHSY6FW66J6YYBP7', 'contract'],
      ['PT (SAC)', 'CBGA2TFTSF236VYPI5TVYQ2Z53DKD6LQHIR5DCGKSNIUJ4NAPNBI6VJM', 'contract'],
      ['PT classic asset', 'SPLDPT-GDNSUOHJIWYXX6HC6ZVDJNLSIBLZMLJYBG7NAN2CRUSXOG4FIDAOH5KN', 'asset'],
      ['USDC (Circle SAC)', MAINNET_USDC, 'contract'],
    ],
  },
];

const TESTNET_SERIES: readonly Deployment[] = [
  {
    name: 'Blend USDC Series 3',
    sdkId: 'testnet-blend-3',
    expiry: 1797531293,
    note: 'Blend TestnetV2 pool. The newest series in the SDK.',
    rows: [
      ['SR (Standardized Return)', 'CA2XUWALW6OZDHDNMHP2JCLTDELQN244WLGTUZJIJQ3WLTMXNKC4PT3U', 'contract'],
      ['Yield (PT/YT engine, also the YT token)', 'CDRY5GIPU64OFW6EJUVCGCFU6WABE4D2HERDK4N5YIZE3IXHRPNT6NSP', 'contract'],
      ['SR Market (PT/SR AMM)', 'CBAADRSGCFPOXCEUKQZ5SRZTR2EPORMLYXEUACCK7HNSCIXJN7V7B7KF', 'contract'],
      ['Fixed-Rate Vault', 'CCOH7V44FYWB633BNX262MQMIS6245NG3G6H3KYE26TJJGAVWP6HATZ3', 'contract'],
      ['Router', 'CAJS5QBRTHTKYWMFUKAWIEL33UJ2KTJIKPZSM3F6CBJ3TKSKLUSHGJJA', 'contract'],
      ['Strategy (Blend adapter)', 'CCT5QTG54ACMXJU4J25PHYRMOF4HK6FTT2M4U6FUQA5GT5BHNMEHYSIW', 'contract'],
      ['PT (SAC)', 'CANBQ2B6I4TRCO4SA3ZHXBHG7WCQH6RU7OEKSHF66F2AJNDAWXANJLG5', 'contract'],
      ['PT classic asset', 'SPLDPT9-GBP4PSKADZSW5C3XQ44ZR5CV5KHA5SFFL2IISNXM3UZAVG63DNPH4NB3', 'asset'],
      ['USDC (Blend test USDC SAC)', TESTNET_USDC, 'contract'],
    ],
  },
  {
    name: 'Testnet Series 3 (2-day)',
    expiry: 1795687988,
    note: 'Blend TestnetV2 pool. A short 2-day series listed in the Spield app, not in the SDK.',
    rows: [
      ['SR (Standardized Return)', 'CAFX7CYIXK2H5D5V4OBNPWEVGPR4EAPSUDBG23EABTWSTWKN73TMDTHQ', 'contract'],
      ['Yield (PT/YT engine, also the YT token)', 'CAHBB37TRRDAVWVL5FJZUODV7UAJRMS5W4XJAAJSH7DLJHYNX5XAMERP', 'contract'],
      ['SR Market (PT/SR AMM)', 'CDCGOQWMD23CDL4XUEKYQRJONAMRO6UJTWFTOXHBBYYKWXUJI7NE7YPC', 'contract'],
      ['Fixed-Rate Vault', 'CCTFFRVQKCHG2P62DKJMVDJ57PINHQA4ZK2H3AOJDWOXX3WA7NB5JPEQ', 'contract'],
      ['Router', 'CAYS7LWTHNM7SWVOI2AB2SC75T2EPI3CXO56R3R3PVNJSZJDMMZUT32Q', 'contract'],
      ['Strategy (Blend adapter)', 'CCI3WDY6M3Y7UCKQEESEIFVWWD3LVEEAW2PLPH2CMUDZQIL4XZQDSU34', 'contract'],
      ['PT (SAC)', 'CBNAINQ2PCBPLIGSOIJXPHEJTDEHNWR5VQ5TD2FTHKL3UCPEXMDMLOR2', 'contract'],
      ['PT classic asset', 'SPLDB2D-GCOUY56V4RJH5XD77VDSGB4VVTYO7NDYPVH2T4UGR2D6V4VEBYGD3A6O', 'asset'],
      ['USDC (Blend test USDC SAC)', TESTNET_USDC, 'contract'],
    ],
  },
  {
    name: 'USTRY Series 2',
    sdkId: 'testnet-ustry-2',
    expiry: 1795899930,
    note: 'Tokenized US Treasuries (USTRY). Testnet only. A different contract set: no SR, no Router, no Fixed-Rate Vault.',
    rows: [
      ['USTRY Series (deposit, split, redeem, claim)', 'CBIY37UHTXL3QJZFRL2QYWSUTCLQCEIK5JFEG4F342SN5T6LLSUWR4FJ', 'contract'],
      ['USTRY Market (PT/USTRY AMM)', 'CC6LKM5HTP6DNRWXUY33WBD7VM6OHJXD3GIHPQWEWB525X6EWADFXWPA', 'contract'],
      ['NAV feed (SEP-40 oracle)', 'CAGB5MUP6QXD5NLGEUULYBOFTYDLHNARI4V5OMRLST4FBS4H5KBHKPGW', 'contract'],
      ['Receipt token (sUSTRY)', 'CCW7Z7MFQ7HZAZ57JO73FBPGGHCR3UGGAEUN77HLRA2X2AJ6AGGDSFQ6', 'contract'],
      ['PT-USTRY (claim token)', 'CBBDBP64N6UCSD7ML7RC6VLERDK46PMHUBCI4JI5HGVAFEVUH66JDXL4', 'contract'],
      ['YT-USTRY (claim token)', 'CDUHFLLZ4OOP2RTLER5OGPJGMB7ATD2K7I7Q73C4TKHCTA4BQBAB4QCK', 'contract'],
      ['USTRY (SAC)', 'CCUGMX7HX6CH6T4XNPALQ7HCVU37RLUNHAYNSAIALTPFHFQVIRIHALBC', 'contract'],
      ['USTRY classic asset (test issuer)', 'USTRY-GC3CW7EDYRTWQ635VDIGY6S4ZUF5L6TQ7AA4MWS7LEQDBLUSZXV7UPS4', 'asset'],
    ],
  },
];

const formatExpiry = (expiry: number) =>
  `${new Date(expiry * 1000).toISOString().slice(0, 16).replace('T', ' ')} UTC`;

const isMatured = (expiry: number) => Date.now() >= expiry * 1000;

function StatusBadge({ expiry }: { expiry: number }) {
  const matured = isMatured(expiry);
  return (
    <span
      suppressHydrationWarning
      className={`rounded border px-1.5 py-0.5 text-xs font-medium ${
        matured ? 'border-fd-border text-fd-muted-foreground' : 'border-emerald-500/60 text-emerald-500'
      }`}
    >
      {matured ? 'Matured: redeem only' : 'Live'}
    </span>
  );
}

function SeriesTable({ network, series }: { network: Net; series: Deployment }) {
  const explorer = EXPLORER[network];
  return (
    <div className="mb-8">
      <h4 className="mb-1 mt-4 flex flex-wrap items-center gap-2 text-base font-semibold">
        {series.name} <StatusBadge expiry={series.expiry} />
      </h4>
      <p className="mb-2 mt-0 text-sm text-fd-muted-foreground">
        Matures {formatExpiry(series.expiry)}
        {series.sdkId ? (
          <>
            {' '}
            · SDK id <code>{series.sdkId}</code>
          </>
        ) : null}
        . {series.note}
      </p>
      <div className="overflow-x-auto">
        <table className="my-0 w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Contract</th>
              <th className="text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {series.rows.map(([label, id, kind]) => (
              <tr key={`${label}-${id}`}>
                <td className="whitespace-nowrap">{label}</td>
                <td>
                  <a
                    href={`${explorer}/${kind}/${id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[12px] break-all"
                    title="View on Stellar Expert"
                  >
                    {kind === 'asset' ? id.replace('-', ':') : id}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Spield contract addresses, tabbed by network, one table per series, with explorer links.
 * Used on Developers, Contract addresses.
 */
export function ContractTables() {
  return (
    <Tabs items={['Mainnet', 'Testnet']}>
      <Tab value="Mainnet">
        <p className="mt-0 text-sm text-fd-muted-foreground">
          Every contract below is administered by a 2-of-3 multisig account,{' '}
          <a
            href={`${EXPLORER.mainnet}/account/${MAINNET_ADMIN}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[12px] break-all"
          >
            {MAINNET_ADMIN}
          </a>
          .
        </p>
        {MAINNET_SERIES.map((s) => (
          <SeriesTable key={s.name} network="mainnet" series={s} />
        ))}
      </Tab>
      <Tab value="Testnet">
        {TESTNET_SERIES.map((s) => (
          <SeriesTable key={s.name} network="testnet" series={s} />
        ))}
      </Tab>
    </Tabs>
  );
}
