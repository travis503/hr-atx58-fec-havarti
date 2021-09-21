import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { makeStyles } from '@material-ui/core/styles';

const modalStyles = makeStyles({
  modal: {
    position: 'absolute',
    width: 800,
    height: 800,
    border: '2px solid #000',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    'text-align': 'center',
    'background-color': 'white',
  },
  form: {
    padding: '10px',
    width: 500
  },
  button: {
    padding: '0 5px',
    margin: '10px',
  },

});


export default function AnswerModal(props) {
  const classes = modalStyles()
  const [aModalOpen, setAModalOpen] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [allValues, setAllValues] = useState({
    answer: '',
    nickname: '',
    email: '',
  });
  // const [answerImage, setAnswerImage] = useState({})

  const validateForm = (answerBody, nickname, email) => {
    if (email.indexOf('@') === -1 || email.indexOf('.com') === -1) {
      setAllValues({...allValues, [email]: ''})
      setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }

    if (answerBody === '') {
      setAllValues({...allValues, [question]: ''})
      setQuestionInvalid(true);
    } else {
      setQuestionInvalid(false);
    }

    if (nickname === '') {
      //left this setValue incase I add more parameters for the nickname
      setAllValues({...allValues, [nickname]: ''})
      setNicknameInvalid(true);
    } else {
      setNicknameInvalid(false);
    }
  }

  const handleOpen = () => {
    setAModalOpen(true);
  };

  const handleClose = () => {
    setAModalOpen(false);
  };

  const changeHandler = (e) => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    var answerBody = allValues.answer;
    var nickname = allValues.nickname;
    var email = allValues.email;

    validateForm(answerBody, nickname, email);
    //needs to make a post request to the server/append it to state
    console.log(allValues);
    //need to format the inputs. Easiest way would be to append them to the database and have it auto increment question id, and then also update state for us in the form of a request body.

    //ALSO NEEDS TO CLOSE THE MODAL (after successful validation)
  }
  return (
    <div id='answerModal'>
      <Button id='addAnswer' variant='contained' onClick={handleOpen} className={classes.button}>Add an Answer</Button>
      <Modal
        open={aModalOpen}
        onClose={handleClose}
        aria-labelledby='Submit your Answer'
        aria-describedby='a modal to post a new answer'
      >
        <div className={classes.modal}>
          <h3>Submit your Answer</h3>
          <h4>About the [product name here]</h4>
          <form className='addAnswerForm'>
            <TextField
              id='answerField'
              required
              multiline
              rows={6}
              label='Write your answer'
              variant='outlined'
              className={classes.form}
              name='answer'
              onChange={changeHandler}
            /><br/>
            <TextField
              id='nicknameFieldA'
              required
              label='What is your nickname'
              variant='outlined'
              className={classes.form}
              name='nickname'
              onChange={changeHandler}
            /><br/>
            <TextField
              id='emailFieldA'
              required
              error={emailInvalid}
              label='What is your email'
              variant='outlined'
              className={classes.form}
              name='email'
              onChange={changeHandler}
              helperText={emailInvalid ? 'Please provide a valid email' : ''}
            /><br/>
            <label htmlFor="addYourPictures">
              <input accept="image/*" id="addYourPictures" type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <Button variant='contained' className={classes.button} onClick={handleSubmit} >submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}