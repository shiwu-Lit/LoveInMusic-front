import axiosInstance from "@/utils/axios.js";

//自动补全下拉列表推荐
export function getSuggestListApi(keywords){
    return axiosInstance({
        url: 'anyone/score/suggest',
        params: {
            prefix: keywords
        }
    })
}

//根据关键词分页查询商品列表
export function getScoreListBySearchApi(keywords, page, pageSize){
    return axiosInstance({
        url: 'anyone/score/key',
        params: {
            keywords: keywords,
            page: page,
            pageSize: pageSize
        }
    })
}

//查询所有分类商品
export function getTypeScoreApi(){
    return axiosInstance({
        url: 'anyone/scoretype'
    })
}

//根据分类查询商品列表
export function getScoreByTypeApi(type, page, size){
    return  axiosInstance({
        url: 'anyone/score/type',
        params: {
            type: type,
            page: page,
            size: size
        }
    })
}


export function getScoreDetailsByIdApi(id) {
    return axiosInstance({
        url: 'anyone/score/detail/'+id,

    });
}


// 获取热门曲谱
export function getHotScoreListApi(key) {
    return axiosInstance({
        url: 'anyone/score/hotscore',
        params: {
            key: key
        }
    });
}

// 获取所有曲谱
export function getAllScores(page, pageSize) {
    return axiosInstance({
        url: 'anyone/score',
        params: {
            page: page,
            pageSize: pageSize,
        },
    });
}