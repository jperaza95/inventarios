/* eslint-disable react/prop-types */
const AlertSuccess = ({ mensaje }) => {
    return (
        <div className="alert alert-success col-md text-center" role="alert" data-aria-autofocus="true">
            {mensaje}
        </div>
    );
};



export default AlertSuccess;