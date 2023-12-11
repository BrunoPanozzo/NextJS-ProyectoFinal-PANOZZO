const Loading = ({texto}) => {

    if (!texto)
        return

    return (
        <div className="w-full h-full flex items-center justify-center">
            <strong className="text-4xl text-blue-600 pt-10">{`${texto}`}</strong>
        </div>
    );
}

export default Loading; 