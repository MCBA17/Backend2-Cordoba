import ProductDao from "../dao/product.dao.js"

class ProductRepository{

    async createProduct(productData){
        return await ProductDao.save(productData)
    }

    async findById(id){
        return await ProductDao.findById(id)
    }

    async findByIdAndUpdate(id,{...productData}){
        return await ProductDao.update(id,{...productData})
    }

    async findByIdAndDelete(id){
        return await ProductDao.delete(id)
    }

    async paginate(obj,ops){
        return await ProductDao.paginate(obj, ops)
    }

}

export default new ProductRepository();