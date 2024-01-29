import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartGif from "../assest/empty.gif";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  console.log(productCartItem);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Seu Carrinho
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/*Itens no carrinho*/}
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/*Itens totais no carrinho*/}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg rounded">
                Somatório
              </h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Quantidade total :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Preço total :</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">R$ </span>
                  {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full rounded text-lg font-bold py-2 text-white">
                Pagamento
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
                <img src={emptyCartGif} className="w-full max-w-sm"/>
                <p className="text-slate-500 text-3xl font-bold">Carrinho Vazio</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
