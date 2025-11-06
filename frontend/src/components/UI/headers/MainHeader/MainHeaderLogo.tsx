import {memo} from "react";
import Link from "next/link";

function MainHeaderLogo() {

    return (
        <Link href={'/'}>
            <div className={'p-3'}>
                <h1 className='font-semibold text-2xl'>Patched</h1>
            </div>
        </Link>
    )
}

export default memo(MainHeaderLogo);