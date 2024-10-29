import cartDao from "../dao/cart.dao.js"

class CartRepository{

    async createCart(cartData){
        return await cartDao.save(cartData)
    }

    async saveCart(cartData){
        return await cartDao.save(cartData)
    }

    async getCartById(cid){
        return await cartDao.findById(cid)
    }

    async updateCart(cid,cartData){
        return await cartDao.update(cid,cartData)
    }

    async deleteCart(cid){
        return await cartDao.delete(cid)
    }

}

export default new CartRepository();