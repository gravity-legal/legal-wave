import classNames from 'classnames';
import Alipay from './logos/alipay.svg';
import Amex from './logos/amex.svg';
import Code from './logos/code.svg';
import Diners from './logos/diners.svg';
import Discover from './logos/discover.svg';
import Elo from './logos/elo.svg';
import Generic from './logos/generic.svg';
import Hiper from './logos/hiper.svg';
import Hipercard from './logos/hipercard.svg';
import Jcb from './logos/jcb.svg';
import Maestro from './logos/maestro.svg';
import Mastercard from './logos/mastercard.svg';
import Mir from './logos/mir.svg';
import Paypal from './logos/paypal.svg';
import Unionpay from './logos/unionpay.svg';
import Visa from './logos/visa.svg';

const brandToSvg: Record<string, any> = {
  alipay: Alipay,
  amex: Amex,
  code: Code,
  diners: Diners,
  discover: Discover,
  elo: Elo,
  generic: Generic,
  hiper: Hiper,
  hipercard: Hipercard,
  jcb: Jcb,
  maestro: Maestro,
  mastercard: Mastercard,
  mir: Mir,
  paypal: Paypal,
  unionpay: Unionpay,
  visa: Visa,
};

export interface CreditCardBrandIconProps {
  brand?: string;
  className?: string;
}

export const CreditCardBrandIcon = (props: CreditCardBrandIconProps) => {
  let brand = props.brand || 'generic';

  if (brand === 'american express') {
    brand = 'amex';
  }

  const Component = brandToSvg[brand] || Generic;

  const className = classNames(props.className);

  return (
    <Component className={className} style={{ display: 'inline-block' }} />
  );
};
