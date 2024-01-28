import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
    const productCartItem = useSelector((state)=>state.product.cartItem)
    console.log(productCartItem)
  return (
    <>
    <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
            Seu Carrinho
        </h2>
        <div>
            {/*Itens no carrinho*/}
            <div>          </div>


                {/*Itens totais no carrinho*/}
            <div></div>
        </div>
    </div>
    </>
  )
}

export default Cart