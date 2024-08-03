import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Student.css';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import physicsImg from './assets/physics.jpg';
import chemistryImg from './assets/chemistry.jpg';
import mathsImg from './assets/maths.jpg';
import biologyImg from './assets/biology.jpg';

const images = [
  {
    url: physicsImg ,
    title: "Physics",
    width: "100%"
  },
  {
    url: chemistryImg,
    title: "Chemistry",
    width: "100%"
  },
  {
    url: mathsImg,
    title: "Maths",
    width: "100%"
  },
  {
    url: biologyImg,
    title: "Biology",
    width: "100%"
  }
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
    height: 100
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15
    },
    "& .MuiImageMarked-root": {
      opacity: 0
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor"
    }
  }
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%"
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity")
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity")
}));

const StudentDashBoard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedButton, setSelectedButton] = React.useState(null);

  const handleClassClick = (button) => {
    setSelectedButton(button);
    setSelectedClass(button);
  };

  const handleSubjectClick = (subject) => {
    navigate(`/${Number(selectedClass)}/${subject.toLowerCase()}`);
  };

  return (
    <div className="std-container">
      <h1>Hi Puneeth</h1> 
      <p className='std-text'>What are you looking to study today?</p>
        <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled button group"
        style={{ fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif' }}
      >
        <Button
          onClick={() => handleClassClick("11")}
          style={{
            backgroundColor: selectedButton === "11" ? "#d3d3d3" : ""
          }}
        >
          Class 11
        </Button>
        <Button
          onClick={() => handleClassClick("12")}
          style={{
            backgroundColor: selectedButton === "12" ? "#d3d3d3" : ""
          }}
        >
          Class 12
        </Button>
      </ButtonGroup><br/><br/>
      <div className="content">
        {!selectedClass && (<p className='std-text'>Please select a Class</p>)}
        {selectedClass && (<p className='std-text'>Subjects of class {selectedClass}</p>)}
        <div className="button-container">
          {selectedClass && (
            <>
              <Box
                sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  minWidth: 300, 
                  width: "100%", 
                  marginTop: 2, 
                  boxSizing: "border-box"
                }}
              >
                {images.map((image) => (
                  <ImageButton
                    focusRipple
                    key={image.title}
                    onClick={() => handleSubjectClick(image.title)}
                    style={{
                      width: "100%"
                    }}
                  >
                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                          position: "relative",
                          p: 4,
                          pt: 2,
                          pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
                        }}
                      >
                        {image.title}
                        <ImageMarked className="MuiImageMarked-root" />
                      </Typography>
                    </Image>
                  </ImageButton>
                ))}
              </Box>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashBoard;
