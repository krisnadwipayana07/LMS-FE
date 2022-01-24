import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import LinearProgress from "@mui/material/LinearProgress";
import { yellow, indigo, white } from "@mui/material/colors";
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { GeneralContext } from "../contexts/GeneralContext";
import { useContext } from "react";

const classes = {
    button: {
        backgroundColor: indigo[600],
        color: "#fff",
    },
}

const VideoFormDialogue = ({ submitVideoForm }) => {

    const {
        video,
        setVideo,
        handleCloseVideoForm,
        openVideoForm,
        errorInput,
        handleVideo,
        isEditingVideo,
        setIsEditingVideo
    } = useContext(GeneralContext);

    const [loadingUploadQuiz, setLoadingUploadQuiz] = useState(false);
    const [loadingUploadAttachment, setLoadingUploadAttachment] = useState(false);

    const handleFileAttachment = (e) => {
        if (e.target.files[0] !== undefined) {
            setLoadingUploadAttachment(true);
            const profileRef = ref(storage, "/profile/" + e.target.files[0].name);
            uploadBytes(profileRef, e.target.files[0]).then((snapshot) => {
                console.log("uploading file");
                console.log(snapshot);
                getDownloadURL(profileRef).then((url) => {
                    console.log("downloadURL", url);
                    setVideo({
                        ...video,
                        attachment: url,
                    });
                    setLoadingUploadAttachment(false);
                });
            });
        }
    };

    const handleFileQuiz = (e) => {
        if (e.target.files[0] !== undefined) {
            setLoadingUploadQuiz(true);
            const profileRef = ref(storage, "/profile/" + e.target.files[0].name);
            uploadBytes(profileRef, e.target.files[0]).then((snapshot) => {
                console.log("uploading file");
                console.log(snapshot);
                getDownloadURL(profileRef).then((url) => {
                    console.log("downloadURL", url);
                    setVideo({
                        ...video,
                        quiz: url,
                    });
                    setLoadingUploadQuiz(false);
                });
            });
        }
    };

    return (
        <Dialog
            open={openVideoForm}
            onClose={handleCloseVideoForm}
            sx={{
                "& .MuiDialog-paper": {
                    border: `2px solid ${indigo[800]}`,
                    borderRadius: '15px'
                }
            }}
        >
            <Grid
                item
                xs={12}
                md={12}
                sx={{
                    backgroundColor: indigo[500],
                }}
            >
                <DialogTitle>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 500,
                            color: "#fff",
                        }}
                    >
                        Create Video
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="title"
                        label="Video Title"
                        type="title"
                        multiline
                        margin="dense"
                        fullWidth
                        value={video?.title}
                        name="title"
                        error={errorInput.title}
                        helperText={
                            errorInput.title ? "please fill the title" : ""
                        }
                        onChange={handleVideo}
                        sx={{
                            color: 'white'
                        }}
                    />

                    <TextField
                        id="order"
                        label="Order"
                        type="order"
                        multiline
                        margin="dense"
                        fullWidth
                        value={video?.order}
                        name="order"
                        onChange={handleVideo}
                    />
                    <TextField
                        id="url"
                        label="Youtube Id"
                        type="url"
                        multiline
                        margin="dense"
                        fullWidth
                        value={video?.url}
                        name="url"
                        onChange={handleVideo}
                    />
                    <TextField
                        id="caption"
                        label="Caption"
                        type="caption"
                        multiline
                        margin="dense"
                        fullWidth
                        value={video?.caption}
                        name="caption"
                        onChange={handleVideo}
                    />
                    <br />
                    <br />
                    <label htmlFor="contained-button-file">
                        <Typography>Slides (PDF)</Typography>
                        <br />
                        <Input
                            accept=".pdf,.doc,.docx"
                            id="contained-button-file"
                            type="file"
                            onChange={handleFileAttachment}
                        />
                    </label>
                    {loadingUploadAttachment && (
                        <Box maxWidth="300px">
                            <LinearProgress />
                        </Box>
                    )}
                    <br />
                    <br />
                    <label htmlFor="contained-button-file">
                        <Typography>Quiz (PDF/DOC/DOCX)</Typography>
                        <br />
                        <Input
                            accept=".pdf,.doc,.docx"
                            id="contained-button-file"
                            type="file"
                            onChange={handleFileQuiz}
                        />
                    </label>
                    {loadingUploadQuiz && (
                        <Box maxWidth="300px">
                            <LinearProgress />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseVideoForm} sx={classes.button}>
                        Cancel
                    </Button>
                    <Button onClick={submitVideoForm} sx={classes.button}>
                        Submit
                    </Button>
                </DialogActions>
            </Grid>
        </Dialog>
    );
}

export default VideoFormDialogue;