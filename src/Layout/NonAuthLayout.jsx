import withRouter from "../Components/withRouter";

const NonAuthLayout = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default withRouter(NonAuthLayout)