import React, {Fragment, useEffect, useState} from "react";
import "./NewProduct.css";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, createProduct} from "../../actions/productAction";
import {useAlert} from "react-alert";
import {Button} from "@material-ui/core";
import MetaData from "../layout/header/MetaData";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import {NEW_PRODUCT_RESET} from "../../constants/productConstants";
import {useNavigate} from "react-router-dom";
import ScaleIcon from '@mui/icons-material/Scale';
import VaccinesIcon from '@mui/icons-material/Vaccines';

const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {loading, error, success} = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState("");
    const [usage, setUsage] = useState("");
    // const [manufacturer, setManufacturer] = useState("");
    const [price, setPrice] = useState(0);
    // const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    //categories
    // const categories = [
    //
    // ];

    // manufacturers in bd
    // const manufacturers = [
    //
    // ];


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({
                type: NEW_PRODUCT_RESET
            });
        }
    }, [dispatch, alert, error, success, navigate]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("product_name", name);
        myForm.set("product_type", type);
        myForm.set("product_weight", weight);
        // myForm.set("product_manufacturer", manufacturer);
        myForm.set("product_price", price);
        myForm.set("product_usage", usage);
        // myForm.set("product_category", category);
        myForm.set("product_stock", stock);

        images.forEach((image) => {
            myForm.append("product_images", image);
        });
        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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
            <MetaData title="Create Product"/>
             <div className="dashboard">
                <SideBar/>
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

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
                        {/*    <select onChange={(e) => setManufacturer(e.target.value)}>*/}
                        {/*        <option value="">Choose Manufacturer</option>*/}
                        {/*        {manufacturers.map((manu) => (*/}
                        {/*            <option key={manu} value={manu}>*/}
                        {/*                {manu}*/}
                        {/*            </option>*/}
                        {/*        ))}*/}
                        {/*    </select>*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*    <AccountTreeIcon/>*/}
                        {/*    <select onChange={(e) => setCategory(e.target.value)}>*/}
                        {/*        <option value="">Choose Category</option>*/}
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
                            />
                        </div>

                        <div>
                            <StorageIcon/>
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Medicine Preview"/>
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={!!loading}
                        >
                            Create Product!
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export {NewProduct};