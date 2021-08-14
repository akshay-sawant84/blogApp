const badRequest = (resp, description) => {
    resp.status(400).json({
      success: false,
      description: description ? description : 'Unable To Process Data',
      data: null,
    });
  };
  
  const validationResponse = (res, data) => {
    let errors = data.errors;
    let errorKey = Object.keys(errors)[0];
    res.status('422').send({
      success: false,
      message: errors[errorKey][0],
    });
  };
  
  const catchResponse = (resp, description) => {
    resp.status(500).json({
      success: false,
      description: description ? description : 'Internal Server Error',
    });
  };
  
  const successResponse = (resp, description, data) => {
    resp.status(200).json({
      success: true,
      description: description ? description : '',
      data: data ? data : null,
    });
  };
  
  const failedResponse = (resp, description) => {
    resp.status(404).json({
      success: true,
      description: description ? description : '',
      data: null,
    });
  };
  
  const authError = (resp, description) => {
    resp.status(401).json({
      success: true,
      description: description ? description : 'UnAuthorized',
      data: null,
    });
  };
  
  module.exports = {
    badRequest,
    validationResponse,
    catchResponse,
    successResponse,
    failedResponse,
    authError,
  };
  