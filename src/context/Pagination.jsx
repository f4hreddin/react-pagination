import React, { useContext, createContext, useEffect, useState, useCallback, useMemo, memo } from "react";

const PaginationContext = createContext();

export const usePagination = () => useContext(PaginationContext);

const PaginationRouter = ({ routes }) => {
    const [currentPage, setPage] = useState('main');
    const [element, setElement] = useState(null);

    const _routes = useMemo(() => {
        return routes.map((route) => {
            let updatedPath = route.path;
            if (route.path.includes(':')) {
                updatedPath = updatedPath.replace(/:slug/g, '([0-9a-zA-Z-]+)');
                updatedPath = updatedPath.replace(/:id/g, '([0-9-]+)');
            }
            return { ...route, path: `^${updatedPath}$` };
        });
    }, [routes, currentPage]);

    useEffect(() => {
        let foundElement = null;
        for (const route of _routes) {
            const regExp = currentPage.match(route.path);
            if (regExp !== null) {
                foundElement = route;
                break;
            }
        }
        setElement(foundElement);
    }, [currentPage, _routes]);

    const Navigate = useCallback((page) => {
        let foundElement = null;
        for (const route of _routes) {
            const regExp = new RegExp(route.path);
            const match = page.match(regExp);
            if (match && match[0] === page) {
                foundElement = route;
                break;
            }
        }

        if (foundElement) {
            setPage(page);
        } else {
            setPage('404');
        }
    }, [_routes]);

    const Link = useCallback(({ to, children, element = 'button', clss = '' }) => {
        const isActive = to === currentPage ? 'active' : '';
        const handleClick = useCallback((e) => {
            e.preventDefault();
            Navigate(to);
        }, [to, Navigate]);

        return React.createElement(element, {
            className: `${isActive} ${clss}`,
            onClick: handleClick,
            children
        });
    }, [currentPage, Navigate]);

    const ErrorPage = useCallback(({ Link }) => {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="text-xl">Page not found</p>
                <Link to="main" clss="mt-4 text-blue-500">Go to main page</Link>
            </div>
        );
    }, [Link]);

    return (
        <PaginationContext.Provider value={{ page: currentPage, Navigate, Link }}>
            {element ? (
                React.createElement(element.component, {
                    params: currentPage.match(element.path) ? currentPage.match(element.path).slice(1) : [],
                    Link,
                    Navigate,
                    currentPage
                })
            ) : (
                <ErrorPage Link={Link} />
            )}
        </PaginationContext.Provider>
    );
};

export default memo(PaginationRouter);