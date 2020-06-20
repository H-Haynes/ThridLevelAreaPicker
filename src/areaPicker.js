/**
 * created on Thu June 15:22:16 2020
 * @author hehong_yf@163.com
 * @github https://github.com/HehongGit/ThridLevelAreaPicker
 */

var selectIconTpl = `
<div class="icon selectIcon hide">
    <svg style="position: absolute;top: 0;right: 0;fill: #67c23a;" id="icon-biaoqian_biaoqian-xuanzhong" viewBox="0 0 1024 1024"><path d="M768 0H0l1024 1024V256c0-140.8-115.2-256-256-256z m192 160l-320 345.6c-12.8 6.4-25.6 6.4-32 0L448 313.6v-12.8l19.2-25.6c0-6.4 6.4-6.4 12.8 0l128 102.4c6.4 6.4 19.2 6.4 25.6 0L928 128h12.8l19.2 19.2v12.8z"></path></svg>
</div>
`
var AreaPickerTpl = `
<style>
    .dialogMask{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2200;
    }
    .areaDialog{
        font-family: 微软雅黑, 黑体, 宋体, Arial, Helvetica, sans-serif;
        width: 690px;
        min-height: 220px;
        position: fixed;
        left: 0px;
        right: 0px;
        top: 50%;
        z-index: 2201;
        display: none;
        transform: scale(1) translateY(-50%);
        background: rgb(255, 255, 255);
        margin: 0px auto;
        border-radius: 4px;
        animation: 0.3s ease-in 0s 1 normal none running setTranslate;
    }
    .areaDialog.show{
        display: block;
    }
    .areaDialog .header{
        width: 100%;
        height: 50px;
        line-height: 50px;
        position: relative;
        border-bottom: 1px solid #e5e5e5!important;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        border-radius: 4px 4px 0 0;
    }
    .areaDialog .header .title {
        margin-left: 20px;
        color: #4c566c;
        font-size: 16px;
        font-weight: 700;
    }
    .areaDialog .header .closeBtn {
        width: 15px;
        height: 15px;
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -10px;
        cursor: pointer;
        -webkit-transition: .3s;
        transition: .3s;
    }
    .areaDialog .dialogBody {
        min-height: 120px;
        padding: 20px 0;
        font-size: 14px;
    }
    .areaDialog .area {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 350px;
    }
    .areaDialog .area .province {
        width: 200px;
        height: 100%;
        border-right: 1px solid #dadada;
        padding-right: 4px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .areaDialog .area .province ul {
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .areaDialog .area .province ul li {
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
    }
    .areaDialog .area .province ul li .numBox {
        width: 60px;
        text-align: right;
        display: inline-block;
    }
    .areaDialog .area .province ul li.check .name {
        color: #67c23a;
        font-weight: 700;
    }
    .areaDialog .area .province ul li .numBox .num {
        font-size: 12px;
        display: inline-block;
        padding: 0 5px;
        border-radius: 20px;
        background: #67c23a;
        color: #fff;
        margin-right: 6px;
        line-height: 16px;
    }
    .areaDialog .area .city {
        width: 480px;
        height: 100%;
        padding-left: 20px;
    }
    .areaDialog .area .city .title {
        height: 36px;
        line-height: 36px;
        font-weight: 700;
        color: #000;
    }
    .areaDialog .area .city .cityList {
        width: 100%;
        height: 234px;
        overflow-y: auto;
        padding-top: 10px;
    }
    .areaDialog .area .cityBlock , .areaDialog .area .townBlock{
        display: inline-block;
        padding: 0 14px;
        height: 30px;
        line-height: 30px;
        margin: 0 10px 10px 0;
        border: 1px solid #dadada;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
    }
    .areaDialog .area .cityBlock.checkArea, .areaDialog .area .townBlock.checkArea {
        border: 1px solid #67c23a;
        background: #f0f9eb;
    }
    .areaDialog .area .otherCity,.areaDialog .area .otherTown {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .areaDialog .area .cityBlock , .areaDialog .area .townBlock{
        display: inline-block;
        padding: 0 14px;
        height: 30px;
        line-height: 30px;
        margin: 0 10px 10px 0;
        border: 1px solid #dadada;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
    }
    @keyframes setTranslate
    {
        0%{transform: scale(.5) translateY(-100%);}
        5%{transform: scale(.5025) translateY(-99.5%);}
        10%{transform: scale(.51) translateY(-98.03%);}
        15%{transform: scale(.5225) translateY(-95.69%);}
        20%{transform: scale(.54) translateY(-92.59%);}
        25%{transform: scale(.5625) translateY(-88.88%);}
        30%{transform: scale(.59) translateY(-84.74%);}
        35%{transform: scale(.6224) translateY(-80.32%);}
        40%{transform: scale(.66) translateY(-75.75%);}
        45%{transform: scale(.7025) translateY(-71.17%);}
        50%{transform: scale(.75) translateY(-66.66%);}
        55%{transform: scale(.7975) translateY(-62.69%);}
        60%{transform: scale(.84) translateY(-59.52%);}
        65%{transform: scale(.8775) translateY(-56.98%);}
        70%{transform: scale(.9099) translateY(-54.94%);}
        75%{transform: scale(.9375) translateY(-53.33%);}
        80%{transform: scale(.96) translateY(-52.08%);}
        85%{transform: scale(.9775) translateY(-51.15%);}
        90%{transform: scale(.99) translateY(-50.5%);}
        95%{transform: scale(.9975) translateY(-50.12%);}
        100%{transform: scale(1) translateY(-50%);}
    }
    .areaDialog .cityList .selectIcon,.areaDialog .townList .selectIcon{
        width: 16px;
        height: 16px;
        position: absolute;
        right: -1px;
        top: -1px;
        z-index: 10;
        color: #28bb6a;
    }
    .areaDialog .footer {
        width: 100%;
        height: 72px;
        line-height: 72px;
        text-align: center;
        padding-bottom: 30px;
        border-top: 1px solid #e5e5e5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .areaDialog .footer .footBtn {
        width: 144px;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        text-align: center;
        border: none;
        outline: 0;
        background: 0 0;
        font-size: 14px;
        cursor: pointer;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #67c23a;
        -webkit-transition: .3s;
        transition: .3s;
    }
    .areaDialog .footer .confirmBtn {
        background-image: linear-gradient(to right, #22e0be , #2dde83)!important;
        color: #fff;
        position: relative;
        border-color: transparent;
    }
    .areaDialog .footer .confirmBtn .loadingIcon {
        width: 24px;
        height: 24px;
        display: inline-block;
        background: url(../image/newVer/loading.png?v=201905061522) no-repeat;
        background-size: contain;
        position: absolute;
        right: 6px;
        top: 6px;
        animation: loading 1s linear infinite;
        -webkit-animation: loading 1s linear infinite;
        -moz-animation: loading 1s linear infinite;
        -o-animation: loading 1s linear infinite;
        display: none;
    }
    .areaDialog .footer .cancleBtn {
        background: #fff;
        color: #67c23a;
        margin-left: 10px;
    }
    .three-quarters-loader:not(:required) { -moz-animation: three-quarters-loader 850ms infinite linear; -webkit-animation: three-quarters-loader 1250ms infinite linear; animation: three-quarters-loader 1250ms infinite linear; border: 8px solid #38e; border-right-color: transparent; border-radius: 16px; box-sizing: border-box; display: inline-block; position: relative; overflow: hidden; text-indent: -9999px; width: 32px; height: 32px;margin-left:20px; }
    @-moz-keyframes three-quarters-loader { 0% { -moz-transform: rotate(0deg); transform: rotate(0deg); } 100% { -moz-transform: rotate(360deg); transform: rotate(360deg); } }
    @-webkit-keyframes three-quarters-loader { 0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); } }
    @keyframes three-quarters-loader { 0% { -moz-transform: rotate(0deg); -ms-transform: rotate(0deg); -webkit-transform: rotate(0deg); transform: rotate(0deg); } 100% { -moz-transform: rotate(360deg); -ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg); } }
    .areaDialog .area .province::-webkit-scrollbar-track,.areaDialog .cityList::-webkit-scrollbar-track{
        border-radius: 0;
        background: #e1e1e1;
        position: absolute;
    }
    .areaDialog .area .province::-webkit-scrollbar-thumb,.areaDialog .cityList::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #aeaeae;
        position: absolute;
    }
    .areaDialog .area .province::-webkit-scrollbar,.areaDialog .cityList::-webkit-scrollbar {
        width: 4px;
        position: absolute;
    }

    .area-detail{
        display:flex;
        flex-direction:column;
    }
    .area-detail .city{
        flex:1;
        height:50%;
        overflow-y:scroll;
    }
    .area-detail .town{
        border-top:10px solid #f1f2f6;
        padding-left:20px;
        height:50%;
        flex:1;
        overflow-y:scroll;
        width:480px;
    }
    .area-detail .town .title{
        height: 36px;
        line-height: 36px;
        font-weight: 700;
        color: #000;
    }
    .hide{
        visibility:hidden;
    }

</style>

<div id="zdd-area-picker">
    <div class="dialogMask hide"></div>
    <div class="areaDialog">
        <div class="header">
            <p class="title">选择地区</p>
            <span class="closeBtn">
                <svg class="absolute" id="icon-guanbi" viewBox="0 0 1024 1024"><path d="M982.4 86.4l-44.8-44.8L512 466.56 86.4 41.6l-44.8 44.8L466.56 512 41.6 937.6l44.8 44.8L512 557.44l425.6 424.96 44.8-44.8L557.44 512l424.96-425.6z"></path></svg>
            </span>
        </div>
        <div class="dialogBody"></div>
        <div class="footer">
            <button class="footBtn confirmBtn">
                确认
                <span class="loadingIcon"></span>
            </button>
            <button class="footBtn cancleBtn">取消</button>
        </div>
    </div>
</div>
`

var AreaPickerCallback = null
var AreaPickerprovinceIndex = null
var AreaPickerData = []
var AreaPickerCityLoading = true
var AreaPickerCityIndex = null
var AreaPickerTownLoading = true
var AreaPickerTownIndex = null;


var ShowAreaPicker = function (callback) {
    AreaPickerCallback = callback

    //数据兼容:如果数据里的city每项中没有town属性，则为旧版二级插件数据，新增all和town
    for(var i =0; i<AreaPickerData.length;i++){
        if(AreaPickerData[i].city.length>0){
            for(var j = 0;j<AreaPickerData[i].city.length;j++){

                if(!AreaPickerData[i].city[j].town){

                    AreaPickerData[i].city[j].all=1;
                    AreaPickerData[i].city[j].town=[];
                }
            }
        }
    }
    var $picker = $('#zdd-area-picker')
    if (!$picker.length) {
        $('body').append(AreaPickerTpl)

        $("#zdd-area-picker").on('click', '.cityBlock', ChooseAreaPickerCity)
        $("#zdd-area-picker").on('click', '.cancleBtn, .closeBtn, .dialogMask', CloseAreaPicker)
        $("#zdd-area-picker").on('click', '.confirmBtn', ConfirmAreaPicker)
        $("#zdd-area-picker").on('click', '.townBlock', ChooseAreaPickerTown)
        LoadAreaPicker()
    }else{
        LoadAreaPicker()
    }
    $('#zdd-area-picker .areaDialog').addClass('show')
    $('#zdd-area-picker .dialogMask').removeClass('hide')

}

var LoadAreaPicker = function () {
    console.log("进入了加载函数")
    $('#zdd-area-picker .areaDialog').addClass('show')
    $('#zdd-area-picker .dialogMask').removeClass('hide')
    $(".areaDialog .dialogBody").html('<span class="three-quarters-loader"></span>')

    if (vue_area.length > 0) {
        var areaDialogMain = `
            <div class="area">
                <div class="province">
                    <ul>
                    ${vue_area.map(province => `
                        <li>
                            <span class="numBox"><span class="num"></span></span>
                            <span class="name">${province.label}</span>
                        </li>
                    `).join('')}
                    </ul>
                </div>
                <div class="area-detail">
                    <div class="city" >

                    </div>

                    <div class="town">

                    </div>
                </div>

            </div>
        `
        $(".areaDialog .dialogBody").html(areaDialogMain)

        $(".areaDialog .province ul li").click(ShowAreaPickerCity)

        $(".areaDialog ").on('click', '.cityList .cityBlock', ShowAreaPickerTown)
        //已设置配置
        if (AreaPickerData.length != 0) {
            for (var i = 0; i < AreaPickerData.length; i++) {
                $(".areaDialog .province ul li").eq(parseInt(AreaPickerData[i].index)).click()
            }
        }

        $(".areaDialog .province ul li").eq(0).click()

        //省份的计数显示
        for(var i =0;i<AreaPickerData.length;i++){
            $(".areaDialog .province ul li").eq(AreaPickerData[i].index).find('.numBox .num').text(AreaPickerData[i].all==1 ? '全部' : AreaPickerData[i].city.length)
        }
    }
}

var ShowAreaPickerCity = function () {
// console.log($(this).index())
//先隐藏第三级数据
$(".town").empty();
//重置市、区索引
AreaPickerCityIndex = null;
AreaPickerTownIndex = null;
if (AreaPickerprovinceIndex != $(this).index()) {
    AreaPickerprovinceIndex = $(this).index()
    $(".areaDialog .province ul li").eq(AreaPickerprovinceIndex).addClass('check').siblings().removeClass('check')
    var AreaPickerCityData = vue_area[AreaPickerprovinceIndex].children;
    let provinceItem = AreaPickerData.find(ele => ele.index == AreaPickerprovinceIndex);
    var areaCityTpl = `
        <div class="title">
            <span class="name">${vue_area[AreaPickerprovinceIndex].label}</span>
        </div>
        <div class="cityList">
            <div class="all cityBlock ${provinceItem && provinceItem.all==1?'checkArea' :''}">
                全部
                <div class="icon selectIcon ${(provinceItem && provinceItem.all==1) ? '' :'hide'}">
                    <svg style="position: absolute;top: 0;right: 0;fill: #67c23a;" id="icon-biaoqian_biaoqian-xuanzhong" viewBox="0 0 1024 1024"><path d="M768 0H0l1024 1024V256c0-140.8-115.2-256-256-256z m192 160l-320 345.6c-12.8 6.4-25.6 6.4-32 0L448 313.6v-12.8l19.2-25.6c0-6.4 6.4-6.4 12.8 0l128 102.4c6.4 6.4 19.2 6.4 25.6 0L928 128h12.8l19.2 19.2v12.8z"></path></svg>
                </div>
            </div>
            <div class="otherCity">
                ${AreaPickerCityData.map(city => `
                    <div class="cityBlock ${provinceItem && provinceItem.city.some(ele=>ele.label == city.label) ? 'checkArea' : ''}">
                        ${city.label}
                        <div class="icon selectIcon ${provinceItem && provinceItem.city.some(ele=>ele.label == city.label) ? '' : 'hide'}">
                            <svg style="position: absolute;top: 0;right: 0;fill: #67c23a;" id="icon-biaoqian_biaoqian-xuanzhong" viewBox="0 0 1024 1024"><path d="M768 0H0l1024 1024V256c0-140.8-115.2-256-256-256z m192 160l-320 345.6c-12.8 6.4-25.6 6.4-32 0L448 313.6v-12.8l19.2-25.6c0-6.4 6.4-6.4 12.8 0l128 102.4c6.4 6.4 19.2 6.4 25.6 0L928 128h12.8l19.2 19.2v12.8z"></path></svg>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `

    $(".areaDialog .dialogBody .city").html(areaCityTpl)

}
}

var ChooseAreaPickerCity = function () {

var exist = false,
    add = true

if ($(this).hasClass('all')) {
    //隐藏区级数据,优化时可考虑用hide来增加市级数据的显示区域大小,
    $(".town").empty();
    AreaPickerTownIndex = null;
    if ($(this).hasClass('checkArea')) {
        $(this).removeClass('checkArea').children('.selectIcon').addClass('hide')
        $(".areaDialog .dialogBody .province ul li").eq(AreaPickerprovinceIndex).find('.numBox .num').text('')
        add = false
    } else {
        $(".areaDialog .dialogBody .city .otherCity .cityBlock").removeClass('checkArea').children('.selectIcon').addClass('hide')
        $(this).addClass('checkArea').children('.selectIcon').removeClass('hide')
        $(".areaDialog .dialogBody .province ul li").eq(AreaPickerprovinceIndex).find('.numBox .num').text('全部')
    }

    if (AreaPickerCityLoading) {
        if (AreaPickerData.length != 0) {
            for (var i = 0; i < AreaPickerData.length; i++) {
                if (AreaPickerData[i].province == vue_area[AreaPickerprovinceIndex].label) {
                    if (add) {
                        AreaPickerData[i].all = 1
                        AreaPickerData[i].city = [];

                        exist = true
                    } else {
                        AreaPickerData.splice(i, 1)
                        exist = true
                        break
                    }


                }
            }
        }

        if (!exist) {
            AreaPickerData.push({
                province: vue_area[AreaPickerprovinceIndex].label,
                index: AreaPickerprovinceIndex,
                all: 1,
                city: []
            })
        }
    }

} else {
    var AreaPickerDataIndex = -1
}
}


var ShowAreaPickerTown = function () {

//if (AreaPickerCityIndex != $(this).index()) { //防止多次点击重复进行多次渲染
    AreaPickerCityIndex = $(this).index();
    var AreaPickerTownData = vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex]

    //从已选列表获取该数据
    let provinceItem, cityItem;
    provinceItem = AreaPickerData.find(ele => ele.index == AreaPickerprovinceIndex)
    if (provinceItem) {
        cityItem = provinceItem.city.find(ele => ele.label == vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].label)
    }
    var townTpl = `
        <div class="title">
            <span class="name">${AreaPickerTownData.label}</span>
        </div>

        <div class="townList">
            <div class="all townBlock ${(cityItem && cityItem.all==1 ? 'checkArea' :'')}">
                全部
                <div class="icon selectIcon ${(cityItem && cityItem.all==1) ? '' :'hide'}">
                    <svg style="position: absolute;top: 0;right: 0;fill: #67c23a;" id="icon-biaoqian_biaoqian-xuanzhong" viewBox="0 0 1024 1024"><path d="M768 0H0l1024 1024V256c0-140.8-115.2-256-256-256z m192 160l-320 345.6c-12.8 6.4-25.6 6.4-32 0L448 313.6v-12.8l19.2-25.6c0-6.4 6.4-6.4 12.8 0l128 102.4c6.4 6.4 19.2 6.4 25.6 0L928 128h12.8l19.2 19.2v12.8z"></path></svg>
                </div>
            </div>
            <div class="otherTown">
                ${AreaPickerTownData.children.map(town => `
                    <div class="townBlock ${(cityItem&&cityItem.town.some(ele=>ele.label== town.label)) ? 'checkArea' : ''}">
                        ${town.label}
                        <div class="icon selectIcon ${(cityItem&&cityItem.town.some(ele=>ele.label== town.label)) ? '' : 'hide'}">
                            <svg style="position: absolute;top: 0;right: 0;fill: #67c23a;" id="icon-biaoqian_biaoqian-xuanzhong" viewBox="0 0 1024 1024"><path d="M768 0H0l1024 1024V256c0-140.8-115.2-256-256-256z m192 160l-320 345.6c-12.8 6.4-25.6 6.4-32 0L448 313.6v-12.8l19.2-25.6c0-6.4 6.4-6.4 12.8 0l128 102.4c6.4 6.4 19.2 6.4 25.6 0L928 128h12.8l19.2 19.2v12.8z"></path></svg>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `
    $(".areaDialog .dialogBody .town").html(townTpl);
//}

}

var ChooseAreaPickerTown = function () {
    AreaPickerTownIndex = $(this).index();
    var provinceItem, cityItem;
    var isAdd = !$(this).hasClass("checkArea");

if (isAdd) { //添加
    if ($(this).hasClass('all')) { //全部

        //查找是否存在该省市选中信息
        provinceItem = AreaPickerData.find(function (ele) {
            return ele.province == vue_area[AreaPickerprovinceIndex].label
        });
        if (!provinceItem) { //没有该省份的选中信息,直接生成一个省级选中对象
            provinceItem = {
                all: 0,
                index: AreaPickerprovinceIndex,
                province: vue_area[AreaPickerprovinceIndex].label,
                city: [{
                    all: 1,
                    index: AreaPickerCityIndex,
                    label: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].label,
                    value: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].value,
                    town: []
                }]
            }
            AreaPickerData.push(provinceItem)
            //自身添加选中并移除其他地区的选中
            $(this).addClass("checkArea")
                .find('.selectIcon')
                .removeClass('hide');

            $(this).siblings(".otherTown")
                .children(".townBlock")
                .removeClass("checkArea")
                .find('.selectIcon')
                .addClass('hide');
            //为市级添加选中样式
            $(".otherCity .cityBlock").eq(AreaPickerCityIndex)
                .addClass("checkArea")
                .find('.selectIcon')
                .removeClass('hide')



        } else { //有省份信息,查找有没有该市
            cityItem = provinceItem.city.find(function (ele) {
                return ele.label == vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].label
            })
            if (cityItem) { //找到了该市的信息，将town清空,all改为1
                cityItem.town = [];
                cityItem.all = 1;

            } else { //没有找到，创建一个市的数据结构
                provinceItem.city.push({
                    index: AreaPickerCityIndex,
                    label: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].label,
                    value: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].value,
                    town: [],
                    all: 1
                })
            }
            // 设置样式
            //市添加选中
            $(".otherCity .cityBlock").eq(AreaPickerCityIndex)
                .addClass("checkArea")
                .find(".selectIcon")
                .removeClass("hide")
            //区全部的选中
            $(this).addClass("checkArea")
                .find('.selectIcon')
                .removeClass('hide');
            $(".otherTown .townBlock").removeClass('checkArea')
                .find('.selectIcon')
                .addClass('hide')

        }
    } else { //单个添加
        //检查省是否存在、检查市是否存在、
        //添加后检查是否区满选,是否市满选
        provinceItem = AreaPickerData.find(ele => ele.province == vue_area[AreaPickerprovinceIndex].label)
        if (!provinceItem) { //不存在省数据,直接创建省级数据
            cityItem = {
                index: AreaPickerTownIndex,
                all: 0,
                label: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].label,
                value: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].value,
                town: [{
                    index: AreaPickerTownIndex,
                    label: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].children[AreaPickerTownIndex].label,
                    value: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].children[AreaPickerTownIndex].value,
                }]
            }
            provinceItem = {
                all: 0,
                index: AreaPickerprovinceIndex,
                province: vue_area[AreaPickerprovinceIndex].label,
                city: []
            }


            provinceItem.city.push(cityItem);
            AreaPickerData.push(provinceItem);
            //给市、区两项添加选中状态
            $(this).addClass("checkArea")
                .find(".selectIcon")
                .removeClass("hide")
            $(".otherCity .cityBlock").eq(AreaPickerCityIndex)
                .addClass("checkArea")
                .find(".selectIcon")
                .removeClass("hide")


        } else { //查找到省份数据,开始查市级数据

            cityItem = provinceItem.city.find(ele => ele.label == vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].label)
            if (cityItem) { //有市级数据，则推入一个区级数据
                cityItem.town.push({
                    index: AreaPickerTownIndex,
                    label: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].children[AreaPickerTownIndex].label,
                    value: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].children[AreaPickerTownIndex].value
                })
                if (cityItem.all == 1) { //移除全选状态
                    console.log("来了")
                    cityItem.all = 0;
                    $(".townList .all").removeClass("checkArea")
                        .find(".selectIcon")
                        .addClass('hide')
                }
                //选中状态
                $(this).addClass("checkArea")
                    .find(".selectIcon")
                    .removeClass("hide")
                $(".otherCity .cityBlock").eq(AreaPickerCityIndex).addClass("checkArea").find(".selectIcon").removeClass("hide")
                //完成后进行一次逐级递增检查，进行全部的筛查


            } else { //没有该市级数据，生成一个市级数据对象
                cityItem = {
                    all: 0,
                    index: AreaPickerCityIndex,
                    label: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].label,
                    value: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].value,
                    town: [{
                        index: AreaPickerTownIndex,
                        label: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].children[AreaPickerTownIndex].label,
                        value: vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].children[AreaPickerTownIndex].value
                    }]
                }
                provinceItem.city.push(cityItem)
                $(this).addClass("checkArea")
                    .find(".selectIcon")
                    .removeClass('hide')
                $(".otherCity .cityBlock").eq(AreaPickerCityIndex)
                    .addClass("checkArea")
                    .find(".selectIcon")
                    .removeClass("hide")

            }
            

        }
        //检查town长度是不是满了
        if (cityItem.town.length == vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].children.length) {
            //满了
            console.log("满了")
            cityItem.all = 1;
            cityItem.town = [];
            $(".townList .all").addClass("checkArea")
                .find(".selectIcon")
                .removeClass("hide")
            $(".otherTown .townBlock").removeClass("checkArea")
                .find(".selectIcon")
                .addClass("hide")
        }
        //单个添加的，市级的全部先移除
        provinceItem.all = 0;
        $(".cityList .all").removeClass("checkArea").find(".selectIcon").addClass("hide")
        //逐级冒泡 区级长度是否和选中长度一致，市级长度是否和选中一致且都是all为1
    }


} else { //取消
    if ($(this).hasClass('all')) {
        //全部，取消全选,从市级数据移除该市，
        //并要检查该市是否处于满选，移除后去除市的满选状态，
        provinceIndex = AreaPickerData.findIndex(function (ele) {
            return ele.index == AreaPickerprovinceIndex
        })
        cityIndex = AreaPickerData[provinceIndex].city.findIndex(function (ele) {
            return ele.index == AreaPickerCityIndex
        })
        AreaPickerData[provinceIndex].city.splice(cityIndex, 1);
        //移除选中样式
        $(this).removeClass("checkArea")
            .find('.selectIcon')
            .addClass('hide');
        //移除市级选中样式
        $(".otherCity .cityBlock").eq(AreaPickerCityIndex)
            .removeClass("checkArea")
            .find('.selectIcon')
            .addClass('hide')


        //检查该省的all是否为1，如果为1，清除该省份的数据
        //                   如果为0，检查该省的city长度，如果为0，清除该省份数据
        if(!provinceItem){  //数据已经被移除了
            $(".areaDialog .dialogBody .province ul li").eq(AreaPickerprovinceIndex).find('.numBox .num').text('')
        }else{
            if (AreaPickerData[provinceIndex].all == 1) {
                AreaPickerData.splice(provinceIndex, 1)
            } else {
                if (AreaPickerData[provinceIndex].city.length == 0) {
                    AreaPickerData.splice(provinceIndex, 1)
                }
            }
        }



    } else {
        //单个取消
        //状态：必定存在省市区三级
        //注意，区级数据取消选中不会触发全部的反向取消
        //注意，取消要逐级递增检查是否某一级为空了，为空则清除该项父级
        //从已选择列表中找到该项并移除,各级的Index 可能都会用上，所以先取出来;
        provinceIndex = AreaPickerData.findIndex(ele => ele.province == vue_area[AreaPickerprovinceIndex].label);
        provinceItem = AreaPickerData[provinceIndex];
        cityItemIndex = provinceItem.city.findIndex(ele => ele.label == vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].label)
        cityItem = provinceItem.city[cityItemIndex]


        var townIndex = cityItem.town.findIndex(ele => ele.label == vue_area[AreaPickerprovinceIndex].children[AreaPickerCityIndex].children[AreaPickerTownIndex].label)
        cityItem.town.splice(townIndex, 1);
        $(this).removeClass("checkArea").find(".selectIcon").addClass("hide")
        //删除之后进行逐级冒泡检查
        if (cityItem.town.length == 0) {
            //该区的选中已经清空了,删除该市的数据
            provinceItem.city.splice(cityItemIndex, 1);
            $(".otherCity .cityBlock").eq(AreaPickerCityIndex).removeClass('checkArea').find('.selectIcon').addClass('hide')
        }
        //检查市级数据是不是空了
        if (provinceItem.city.length == 0) {
            AreaPickerData.splice(provinceIndex, 1);
        }
        
    }

}


//设置标识
//注意，检查加上这个全部之后，检查市是不是全选了：(此处是)
//规则：先简易检查市的长度是否满了，再遍历是否每项的all都是1

if (provinceItem.city.length == vue_area[AreaPickerprovinceIndex].children.length) {
    //长度一致了，检查是不是都是全选
    if (provinceItem.city.every(ele => ele.all == 1)) {
        //都是全选，更改省的all为1，city为空数组,并取消区的选种样式、市的选中样式，为市的全部添加选中
        provinceItem.all = 1;
        provinceItem.city = [];
        $(".townBlock").add(".cityBlock")
            .removeClass("checkArea")
            .find(".selectIcon")
            .addClass('hide')
        $(".cityList .all").addClass("checkArea")
            .find(".selectIcon")
            .removeClass("hide")
        //清空三级区域
        $(".town").empty();
        //省级数据添加'全部'前缀
        $(".areaDialog .dialogBody .province ul li").eq(AreaPickerprovinceIndex).find('.numBox .num').text('全部')


    }else{
        $(".areaDialog .dialogBody .province ul li").eq(AreaPickerprovinceIndex).find('.numBox .num').text(provinceItem.city.length > 0 ? provinceItem.city.length : '')
    }
} else { //防止之前就是全选

    provinceItem.all = 0;
    $(".cityList .all").removeClass("checkArea")
        .find(".selectIcon")
        .addClass("hide")
    //移除省级的全部标识,改为数字标识
    $(".areaDialog .dialogBody .province ul li").eq(AreaPickerprovinceIndex).find('.numBox .num').text(provinceItem.city.length > 0 ? provinceItem.city.length : '')
}

}

var CloseAreaPicker = function () {
$('#zdd-area-picker .areaDialog').removeClass('show')
$('#zdd-area-picker .dialogMask').addClass('hide')
}

var ConfirmAreaPicker = function () {
AreaPickerCallback(AreaPickerData)
CloseAreaPicker()
}





