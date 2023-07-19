const APP_URI = process.env.APP_URI;
import connectMongo from "@/app/utils/connectMongo";
import ResourceCategory from "@/app/models/resourceCategory";
import Resource from "../models/resourcePost";

type FormData = {
    id?:string,
    user?: string;
    title?: string;
    shortDescription?: string;
    image?: string;
    description?: string;
    isPublished?: boolean;
    topNews?: boolean;
    topOthers?: boolean;
    tag?: string;
    popular?: boolean;
    category?: string;
    categoryName?: string;
  };

export async function createCategory(category: String) {
    try{
        await connectMongo();
        await ResourceCategory.create({ name:category });
        return true;
    }catch(err){
        return false;
    }
  }

  export async function getAllCategory() {
    await connectMongo();
    const category = await ResourceCategory.find();  
    return category;
}

export async function getCategoryDetails(category:string) {
    await connectMongo();
    const categoryDetails = await ResourceCategory.findOne({ _id: category });
    return categoryDetails;
}

export async function updateCategoryDetails(id:string, name: string ) {
    try{
        await connectMongo();
        const categoryDetails = await ResourceCategory.findOneAndUpdate({ _id: id }, {name});
        return true;
    }catch(err){
        return false;
    } 
}

export async function createResource(data: FormData) {
    try{
        await connectMongo();
        await Resource.create(data);
        return true;
    }catch(err){
        return false;
    }
  }

  export async function getAllResource() {
    await connectMongo();
    const resource = await Resource.find();  
    return resource;
}

export async function getResourceDetails(id:string) {
    await connectMongo();
    const resourceDetails = await Resource.findOne({ _id: id });
    return resourceDetails;
}

export async function updateResourceDetails(data: FormData ) {
    try{
        await connectMongo();
        const resourceDetails = await Resource.findOneAndUpdate({ _id: data.id }, {...data});
        return true;
    }catch(err){
        return false;
    } 
}





