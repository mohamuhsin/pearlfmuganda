const CopyStatus = ({ status }) => {
    return (
        status && (
            <div className="mt-4 text-center text-lg font-semibold text-green-600">
                {status}
            </div>
        )
    );
};

export default CopyStatus;
