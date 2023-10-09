import getRateLimit from 'actions/getRateLimit';
import { dateToLocaleTimeString } from 'libs/utils';

async function StatusBar() {
  const rateLimit = await getRateLimit();

  return (
    <div
      className="flex w-full flex-none items-center divide-x-2
      border-t-[1px] border-border-primary bg-secondary px-8 py-0.5 text-sm"
    >
      <div className="inline-flex items-center px-4">
        <p className="pr-2">Rate Limit:</p>
        <p className="pr-6 font-semibold">{rateLimit.rate.remaining}</p>
        <p className="pr-2">Reset At:</p>
        <p className="font-semibold">{dateToLocaleTimeString(rateLimit.rate.reset)}</p>
      </div>
    </div>
  );
}

export default StatusBar;
