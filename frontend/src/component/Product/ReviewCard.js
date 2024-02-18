import {Rating} from "@mui/material"
import './ReviewCard.css'
import './ProductDetails.css'
import anonymous from "../../images/anonymous-icon-png-6.jpg"


const ReviewCard = ({review}) => {
    const options = {
        size: "small",
        value: review.rating,
        readOnly: true,
        precision: 0.25
    };


    return (
        <div className='reviewCard'>
            <img src={anonymous} alt='User'/>
            <p>{review.name}</p>
            <Rating {...options}/>
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    )

}

export default ReviewCard;