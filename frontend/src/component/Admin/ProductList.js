import React, {Fragment, useEffect} from "react";
import {DataGrid} from "@material-ui/data-grid";
import "./ProductList.css";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, getAdminProducts, deleteProduct,} from "../../actions/productAction";
import {Link, useNavigate} from "react-router-dom";
import {useAlert} from "react-alert";
import {Button} from "@material-ui/core";
import MetaData from "../layout/header/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {DELETE_PRODUCT_RESET} from "../../constants/productConstants";

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const alert = useAlert();

    const {error, products} = useSelector((state) => state.products);

    const {error: deleteError, isDeleted} = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({
                type: DELETE_PRODUCT_RESET
            });
        }

        dispatch(getAdminProducts());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 150,
            flex: 0.5
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: .5,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon/>
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products &&
    products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.product_stock,
            price: item.product_price,
            name: item.product_name,
        });
    });

    return (
        <Fragment>
            <MetaData title={`All Products - Admin`}/>

            <div className="dashboard">
                <SideBar/>
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export {ProductList};