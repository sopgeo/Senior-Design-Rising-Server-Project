exports.buildPath = 
function buildPath(route, back)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'http://207.154.230.144/' + route;
    }
    else
    {        
        if(back){
            return 'http://localhost:5000/' + route;
        }else{
            return 'http://localhost:3000/' + route;
        }
    }
}
