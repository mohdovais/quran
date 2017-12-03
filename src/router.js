export default class Router{

    constructor(routes){
        const me = this;
        me.routes = {};
        me.addRoutes(routes);
        window.addEventListener('hashchange', me.onHashChange.bind(me));
    }

    addRoutes(_routes){
        const routes = Object.assign({}, _routes);
        const scope = routes.scope || this;

        delete routes.scope;

        for(let i in routes){
            this.addRoute(i, routes[i], scope);
        }
    }

    addRoute(route, callback, scope){
        return this.routes[route] = {
            callback,
            regex: new RegExp(`^${route}$`),
            scope: scope || this
        }
    }

    onHashChange(event){
        this.execute(event.target.location.hash);
    }

    execute(hash){
        const me = this;
        hash = hash === undefined ? window.location.hash : hash;
        hash = hash.replace(/^\#/, '').replace(/\/$/, '');
        const routeMatch = me.getRouteMatch(hash);
        if(routeMatch){
            routeMatch.route.callback.apply(
                routeMatch.route.scope,
                Array.prototype.slice.call(routeMatch.match, 1)
            );
        }else{
            me.routeMissed();
        }

        return me;
    }

    getRouteMatch(hash){
        const routes = this.routes;
        let i, match, route;
        for(i in routes){
            route = routes[i];
            match = route.regex.exec(hash);
            if(match){
                return {
                    route,
                    match
                }
            }
        }
    }

    routeMissed(){

    }

    redirectTo(route){
        window.location = `#${route}`;
    }

    then(fn){
        fn()
    }

}
