
const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
            .catch((err) => next(err));
    }
}




export {asyncHandler}

// we can reun any function in an async mode if we pass it through this function
// const asyncHandler = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message: error.message
//         })
//     }
// }