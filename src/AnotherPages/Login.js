import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function login() {

    const initialValues = {
        email: "",
        password: ""
    };

    const SignInSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),

        password: Yup.string().required("Password is required").min(8, "Password is too short - should be 8 characters minimum"),
    });


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values) => console.log(values)}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik;

                return (
                    <div id="login">
                        <h3 className="text-center text-white pt-5">Login form</h3>
                        <div className="container">
                            <div id="login-row" className="row justify-content-center align-items-center">
                                <div id="login-column" className="col-md-6">
                                    <div id="login-box" className="col-md-12">
                                        <Form id="login-form" className="form">
                                            <h3 className="text-center">Login</h3>
                                            <div className="form-group">
                                                <label htmlFor="email" className="">Email:</label>
                                                <br></br>
                                                <Field type="email" name="email" id="email"
                                                    className="form-control" />
                                                <ErrorMessage name="email" component="span" className="error" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password" className="">Password</label>
                                                <br></br>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="form-control"
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component="span"
                                                    className="error"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    type="submit"
                                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                    disabled={!(dirty && isValid)}
                                                >
                                                    Sign In
                                                </button>
                                            </div>

                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            }}
        </Formik>
    );
};