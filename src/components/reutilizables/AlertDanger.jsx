/* eslint-disable react/prop-types */


const AlertDanger = ({ mensaje }) => {
    return (
        <div className="alert alert-danger col-md text-center" role="alert" data-aria-autofocus="true">
            {mensaje}
        </div>
    );
};



export default AlertDanger;