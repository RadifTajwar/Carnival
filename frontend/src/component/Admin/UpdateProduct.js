import React, {Fragment, useEffect, useState} from "react";
import "./NewProduct.css";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, updateProduct, getProductDetails} from "../../actions/productAction";
import {useAlert} from "react-alert";
import {Button} from "@material-ui/core";
import MetaData from "../layout/header/MetaData";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import {UPDATE_PRODUCT_RESET} from "../../constants/productConstants";
import {useNavigate, useParams} from "react-router-dom";
import ScaleIcon from '@mui/icons-material/Scale';
import VaccinesIcon from '@mui/icons-material/Vaccines';

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();

    const {error, product} = useSelector(state => state.productDetails)
    const {loading, error: updateError, isUpdated} = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState("");
    const [usage, setUsage] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    // //categories
    // const categories = [
    //     "Sports Equipment",
    //     "Gift Items"
    // ];
    //
    // // manufacturers in bd
    // const manufacturers = [
    //     "A",
    //     "B"
    // ];


    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.product_name);
            setType(product.product_type);
            setWeight(product.product_weight);
            setManufacturer(product.product_manufacturer);
            setPrice(product.product_price);
            setUsage(product.product_usage);
            setCategory(product.product_category);
            setStock(product.product_stock);

            setOldImages(product.product_images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Medicine Updated Successfully");
            navigate("/admin/dashboard");
            dispatch({
                type: UPDATE_PRODUCT_RESET
            });
        }
    }, [dispatch, alert, error, navigate, product, id, isUpdated, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("product_name", name);
        myForm.set("product_type", type);
        myForm.set("product_weight", weight);
        myForm.set("product_manufacturer", manufacturer);
        myForm.set("product_price", price);
        myForm.set("product_usage", usage);
        myForm.set("product_category", category);
        myForm.set("product_stock", stock);

        images.forEach((image) => {
            myForm.append("product_images", image);
        });
        dispatch(updateProduct(id, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Update Product"/>
            <div className="dashboard">
                <SideBar/>
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>

                        <div>
                            <SpellcheckIcon/>
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <VaccinesIcon/>
                            <input
                                type="text"
                                placeholder="Type"
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div>
                            <ScaleIcon/>
                            <input
                                type="text"
                                placeholder="Weight"
                                required
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>

                        {/*<div>*/}
                        {/*    <FactoryIcon/>*/}
                        {/*    <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>*/}
                        {/*        <option value="">{manufacturer}</option>*/}
                        {/*        {manufacturers.map((manu) => (*/}
                        {/*            <option key={manu} value={manu}>*/}
                        {/*                {manu}*/}
                        {/*            </option>*/}
                        {/*        ))}*/}
                        {/*    </select>*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*    <AccountTreeIcon/>*/}
                        {/*    <select value={category} onChange={(e) => setCategory(e.target.value)}>*/}
                        {/*        <option value="">{category}</option>*/}
                        {/*        {categories.map((cate) => (*/}
                        {/*            <option key={cate} value={cate}>*/}
                        {/*                {cate}*/}
                        {/*            </option>*/}
                        {/*        ))}*/}
                        {/*    </select>*/}
                        {/*</div>*/}

                        <div>
                            <DescriptionIcon/>

                            <textarea
                                placeholder="Usage"
                                value={usage}
                                onChange={(e) => setUsage(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AttachMoneyIcon/>
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <StorageIcon/>
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>


                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview"/>
                            ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview"/>
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={!!loading}
                        >
                            Update Product!
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export {UpdateProduct};