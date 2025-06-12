type Props = {
    handleClose : () => void
};
export const AddModal = (props: Props) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-gray-400 w-[448px]">
            <h1 className="text-xl font-bold text-center">HELLO ADD</h1>




            <button
                onClick={props.handleClose}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
            >
                닫기
            </button>
        </div>
    );
};