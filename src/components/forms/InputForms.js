/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Grid, Button, TextField, withStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import inflection from 'inflection';

const styles = () => ({});

function InputForm(props) {
  const {
    children, initialValues, submitBtnLabel, onSubmit, validate, passwordField,
    CustomBtnCn, classes, textFieldType, header, resultText, disableSubmitBtn,
  } = props;

  return (
    <div>
      <h1>{header}</h1>
      {resultText}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        render={({
          values, handleSubmit, handleChange, isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              id={textFieldType}
              label={inflection.capitalize(textFieldType)}
              className={classes.TextField}
              style={{ width: '100%' }}
              type={textFieldType}
              name={textFieldType}
              autoComplete={textFieldType}
              onChange={handleChange}
              value={values.email}
              margin="normal"
              variant="outlined"
            />
            {
              passwordField
                ? (
                  <TextField
                    id="password"
                    label="Password"
                    className={classes.TextField}
                    style={{ width: '100%' }}
                    type="password"
                    name="password"
                    autoComplete="password"
                    onChange={handleChange}
                    value={values.password}
                    margin="normal"
                    variant="outlined"
                  />
                )
                : null
            }
            <Grid item>
              <Button
                className={CustomBtnCn}
                color="primary"
                disabled={
                  disableSubmitBtn === 'true'
                    ? isSubmitting
                    : false
                }
                type="submit"
                variant="contained"
              >
                {submitBtnLabel}
              </Button>
              {children}
            </Grid>
          </form>
        )}
      />
    </div>
  );
}

export default withStyles(styles)(InputForm);
