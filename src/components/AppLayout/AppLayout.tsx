import { Suspense } from "react"
import { NavLink, Outlet } from "react-router-dom"

export const AppLayout = () => {
    return (
        <>
            <div>
                <header className="border-gray-500 border-2 rounded-md px-2 py-3">
                    <nav>
                        <ul className="flex gap-10 justify-center">
                            <li className="font-bold uppercase hover:text-indigo-500 transition">
                                <NavLink to="/">Main page</NavLink>
                            </li>
                            <li className="font-bold uppercase hover:text-indigo-500 transition">
                                <NavLink to="/quizes">Quizes</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <Suspense fallback={null}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>
        </>
    );
}