import { BookmarkAdd } from "@mui/icons-material";
import {
  Modal,
  Sheet,
  Card,
  Typography,
  IconButton,
  AspectRatio,
  CardCover,
  CardContent,
  CircularProgress,
  SvgIcon,
  CardOverflow,
  Divider,
  Button,
} from "@mui/joy";
import React from "react";
import {createBookings} from '../../pages/api/bookings/index'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToastMessage from '../../lib/Toastify'
function ApplyModal(
  openApplyModal: boolean,
  setOpenApplyModal: (arg0: boolean) => void,
  data: any
) {
  const _data ={
    "user_uuid":data?.user_uuid,
    "plan_uuid":data?.id,
    "vendor_uuid":data?.Agency?.id
}
  const bookPlan = async () => {
    const response = await createBookings({ data:_data, authtoken:data.authtoken });
    if(response.id){
      showToastMessage("Booked succefully","success")
    }
    else{
      showToastMessage("Error Occured Try again later","error")
    }
  }
  

  const layout = "center";
  function handleLayoutChange(event: React.ChangeEvent<HTMLInputElement>) {
    layout === "center" ? "bottom" : "center";
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      
      />
      <React.Fragment>
      <Modal
        aria-labelledby="close-modal-title"
        open={openApplyModal}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>) => {
          setOpenApplyModal(false);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sheet
          variant="soft"
          sx={{
            minWidth: 300,
            borderRadius: "md",
            p: 0,
          }}
        >
          <Card
            sx={{ width: 320 }}
            variant="soft"
            color="primary"
            invertedColors
          >
            <div>
              <Typography level="title-lg">{data?.name}</Typography>
              <Typography level="body-sm">{data?.createdAt}</Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
              >
                <BookmarkAdd />
              </IconButton>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <CardCover
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              }}
            />
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={20}>
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </SvgIcon>
              </CircularProgress>
              <CardContent>
                <Typography level="body-sm" textColor="primary.400">
                  Total price:
                </Typography>
                <Typography fontSize="lg" level="h2" fontWeight="lg">
                  {data?.total_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "Ksh",
                  })}
                </Typography>
              </CardContent>
            </CardContent>
            <CardOverflow variant="soft">
              <Divider inset="context" />
              <CardContent orientation="horizontal">
                <Typography level="body-xs">6.3k views</Typography>
                <Divider orientation="vertical" />
                <Button variant="outlined" color="neutral">
                  Inspect
                </Button>
                <Divider orientation="vertical" />
                <Button variant="outlined" color="neutral" onClick={bookPlan}>
                  Apply
                </Button>
              </CardContent>
            </CardOverflow>
          </Card>
        </Sheet>
      </Modal>
    </React.Fragment>
    </>
    
  );
}

export default ApplyModal;
