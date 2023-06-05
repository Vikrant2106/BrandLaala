import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { defaultAxios } from '../components/utils/axios/default.axios';


function ImageGalleryModal({  imageGalleryShow,id ,fncCloseModal}) {

    const [gallery, setGallery] = useState([]);

  


    useEffect(() => {
        getImageData();
    }, [id])

 

    async function getImageData() {

            let res = await defaultAxios.get(
                `${process.env.REACT_APP_API_URL}buyer/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            
            setGallery(res?.data?.data?.images)
    }


    return (
        <>
            <Modal
                size="xl"
                show={imageGalleryShow}
                onHide={fncCloseModal}
                aria-labelledby="example-modal-sizes-title-lg"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                       Buyer Images
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Carousel autoPlay={true} centerMode={true} infiniteLoop={true} centerSlidePercentage={100}
                dynamicHeight={100}
                emulateTouch={true}
                interval={3000}
                > 
                    {
                        gallery?.map((d)=>
                        <div>
                        <img src={d?.image_url}/>
                        {/* <p className="legend">{d?.filename}</p> */}
                    </div>
                        )
                    }
            </Carousel>
                  
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ImageGalleryModal;
