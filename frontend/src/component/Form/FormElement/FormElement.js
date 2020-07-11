import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from "@material-ui/core";
import FileInput from "../FileInput/FileInput";

const FormElement = (props) => {
    let inputComponent = <TextField
        fullWidth
        id={props.propertyName}
        name={props.propertyName}
        label={props.title}
        variant="outlined"
        onChange={props.onChange}
        error={!!props.error}
        required={props.required}
        helperText={props.error}
        value={props.value}
        type={props.type}
        autoComplete={props.autoComplete}
    />;

    if (props.type === 'file'){
        inputComponent = <FileInput
            propertyName={props.propertyName}
            onChange={props.onChange}
            value={props.value}
        />
    }

    return inputComponent
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    required: PropTypes.bool,
    type: PropTypes.string,
    autoComplete: PropTypes.string
};
export default FormElement;