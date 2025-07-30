import styles from "./MainButton.module.scss";


interface MainButtonProps {

}


export default function MainButton(){

    return (
        <>
            <div className="mt-4">
                <button onClick={} className={`text-black cursor-pointer w-full font-semibold p-2 rounded-md ${styles.addButton}`}>
                    Сбросить фильтры
                </button>
            </div>
        </>
    )

}