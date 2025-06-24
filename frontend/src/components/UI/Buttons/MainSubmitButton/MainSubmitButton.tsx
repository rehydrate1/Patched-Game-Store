
interface MainSubmitButton {

}


export default function MainSubmitButton(){

    return (
        <>
           

            <div className="mt-4">
                <button type={'submit'} className={`text-black cursor-pointer w-full font-semibold p-2 rounded-md ${styles.addButton}`}>
                    Сбросить фильтры
                </button>
            </div>

        </>
    )

}

