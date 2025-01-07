import Image from "next/image";
import { IconLink } from '../Headers/HeaderStyles';

export function CartIcon({ count = 0 }) {
  return (
    <IconLink href="/cart">
      <Image src="/items/cart.png" alt="購物車" width="24" height="24"/>
      {count > 0 && (
        <span className="cart-badge">
          {count}
        </span>
      )}
    </IconLink>
  );
}