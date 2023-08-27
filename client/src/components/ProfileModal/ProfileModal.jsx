import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserActon";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const {password, ...other} = data
  const [profileImage, setProfileImage] = useState({})
  const [coverImage, setCoverImage] = useState({})
  const[formData, setFormData] = useState(other)
  const dispatch = useDispatch()
  const params = useParams()
  

  const onImageChange = (event)=>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0]
      event.target.name ==='profileImage'?setProfileImage(img):setCoverImage(img)
    }
  }

  const handleOnUpdate = (e)=>{
    e.preventDefault()
    const userData = formData;
    if(profileImage){
      const data = new FormData()
      const fileName = Date.now() + profileImage.name
      data.append("name", fileName)
      data.append("file", profileImage)
      userData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }

    if(coverImage){
      const data = new FormData()
      const fileName = Date.now() + coverImage.name
      data.append("name", fileName)
      data.append("file", coverImage)
      userData.coverPicture  = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(params.id , userData))
    setModalOpened(false)

  }

  const handleOnChange = (e)=>{
    setFormData({...formData , [e.target.name]: e.target.value})
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleOnChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleOnChange}
            value={formData.lastname}

          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleOnChange}
            value={formData.worksAt}

          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="LIves in"
            onChange={handleOnChange}
            value={formData.livesIn}

          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleOnChange}
            value={formData.country}

          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={handleOnChange}
            value={formData.relationship}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" onClick={handleOnUpdate}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;