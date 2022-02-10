package com.ruoyi.web.controller.common;

import java.util.ArrayList;
import java.util.Date;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.utils.DateUtils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoContoller {
    
    @GetMapping("/notices")
    public AjaxResult getNoticeData()
    {
        JSONArray info = new JSONArray();
        JSONObject item  = new JSONObject();
        item.put("id", "000000012");
        item.put("title", "ABCD 版本发布");
        item.put("description", "提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务");
        item.put("extra", "进行中");
        item.put("status", "processing");
        item.put("type", "event");
        info.add(item);

        item  = new JSONObject();
        item.put("id", "000000006");
        item.put("avatar", "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png");
        item.put("title", "左侧图标用于区分不同的类型");       
        item.put("datetime", "2022-01-07");
        item.put("type", "notification");
        info.add(item);

        item  = new JSONObject();
        item.put("id", "000000006");
        item.put("avatar", "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg");
        item.put("title", "曲丽丽 评论了你");
        item.put("description", "描述信息描述信息描述信息");        
        item.put("datetime", "2022-01-01");
        item.put("type", "message");
        item.put("clickClose", true);
        info.add(item);

        AjaxResult ajax = AjaxResult.success();
        ajax.put("data", info);
        return ajax;
    }

    @GetMapping("/fake_analysis_chart_data")
    public AjaxResult getChartData()
    {
        JSONArray visitData = new JSONArray();
        int[] fakeY = {7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5};
        for (int i = 0; i < fakeY.length; i += 1) {
            JSONObject item = new JSONObject();
            Date d = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * i);
            item.put("x", DateUtils.dateTime(d));
            item.put("y", fakeY[i]);
            visitData.add(item);
        }
        
        JSONArray visitData2 = new JSONArray();
        int[] fakeY2 = {1, 6, 4, 8, 3, 7, 2};
        for (int i = 0; i < fakeY2.length; i += 1) {
            JSONObject item = new JSONObject();
            Date d = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * i);
            item.put("x", DateUtils.dateTime(d));
            item.put("y", fakeY2[i]);
            visitData2.add(item);
        }

        JSONArray salesData = new JSONArray();
        for (Integer i = 1; i < 13; i += 1) {
            JSONObject item = new JSONObject();
            item.put("x", i.toString() + "月");
            item.put("y", Math.floor(Math.random()*1000 + 200));
            salesData.add(item);
        }

        JSONArray searchData = new JSONArray();
        for (Integer i = 0; i < 50; i += 1) {
            JSONObject item = new JSONObject();
            item.put("index", i + 1);
            item.put("keyword", "搜索关键词-" + i.toString());
            item.put("count", Math.floor(Math.random()*1000));
            item.put("range", Math.floor(Math.random()*1000));
            item.put("status", Math.floor(Math.random()*1000));
            searchData.add(item);
        }

        JSONArray offlineData = new JSONArray();
        for (Integer i = 1; i <= 50; i += 1) {
            JSONObject item = new JSONObject();
            item.put("name", "Stores " + i.toString());
            item.put("cvr", Math.ceil(Math.random()*9/10));
            offlineData.add(item);
        } 
        
        JSONArray offlineChartData = new JSONArray();
        for (Integer i = 1; i <= 50; i += 1) {
            JSONObject item = new JSONObject();
            item.put("x", new Date().getTime() + 1000 * 60 * 60 * i);
            item.put("y1", Math.floor(Math.random()*1000) + 10);
            item.put("y2", Math.floor(Math.random()*1000) + 10);
            offlineChartData.add(item);
        }

        JSONArray salesTypeData = new JSONArray();
        JSONObject item = new JSONObject();
        item.put("x", "家用电器");
        item.put("y", 4544);
        salesTypeData.add(item);

        item = new JSONObject();
        item.put("x", "食用酒水");
        item.put("y", 3321);
        salesTypeData.add(item);

        item = new JSONObject();
        item.put("x", "个护健康");
        item.put("y", 3113);
        salesTypeData.add(item);

        item = new JSONObject();
        item.put("x", "服饰箱包");
        item.put("y", 2341);
        salesTypeData.add(item);

        item = new JSONObject();
        item.put("x", "母婴产品");
        item.put("y", 1231);
        salesTypeData.add(item);
      
        item = new JSONObject();
        item.put("x", "其他");
        item.put("y", 1231);
        salesTypeData.add(item);

      
        JSONArray salesTypeDataOnline = new JSONArray();
        item = new JSONObject();
        item.put("x", "家用电器");
        item.put("y", 244);
        salesTypeDataOnline.add(item);

        item = new JSONObject();
        item.put("x", "食用酒水");
        item.put("y", 321);
        salesTypeDataOnline.add(item);

        item = new JSONObject();
        item.put("x", "家用电器");
        item.put("y", 244);
        salesTypeDataOnline.add(item);

        item = new JSONObject();
        item.put("x", "个护健康");
        item.put("y", 311);
        salesTypeDataOnline.add(item);

        item = new JSONObject();
        item.put("x", "服饰箱包");
        item.put("y", 41);
        salesTypeDataOnline.add(item);

        item = new JSONObject();
        item.put("x", "母婴产品");
        item.put("y", 121);
        salesTypeDataOnline.add(item);
      
        item = new JSONObject();
        item.put("x", "其他");
        item.put("y", 111);
        salesTypeDataOnline.add(item);

        JSONArray salesTypeDataOffline = new JSONArray();
        item = new JSONObject();
        item.put("x", "家用电器");
        item.put("y", 99);
        salesTypeDataOffline.add(item);

        item = new JSONObject();
        item.put("x", "食用酒水");
        item.put("y", 188);
        salesTypeDataOffline.add(item);

        item = new JSONObject();
        item.put("x", "家用电器");
        item.put("y", 244);
        salesTypeDataOffline.add(item);

        item = new JSONObject();
        item.put("x", "个护健康");
        item.put("y", 311);
        salesTypeDataOffline.add(item);

        item = new JSONObject();
        item.put("x", "服饰箱包");
        item.put("y", 66);
        salesTypeDataOffline.add(item);

        item = new JSONObject();
        item.put("x", "母婴产品");
        item.put("y", 46);
        salesTypeDataOffline.add(item);
      
        item = new JSONObject();
        item.put("x", "其他");
        item.put("y", 65);
        salesTypeDataOffline.add(item);


        JSONArray radarOriginData = new JSONArray();
        item = new JSONObject();
        item.put("x", "家用电器");
        item.put("y", 99);
        radarOriginData.add(item);

        item = new JSONObject();
        item.put("x", "食用酒水");
        item.put("y", 188);
        radarOriginData.add(item);

        item = new JSONObject();
        item.put("x", "家用电器");
        item.put("y", 244);
        radarOriginData.add(item);

        JSONObject res = new JSONObject();
        res.put("visitData", visitData);
        res.put("visitData2", visitData2);
        res.put("salesData", salesData);
        res.put("searchData", searchData);
        res.put("offlineData", offlineData);
        res.put("offlineChartData", offlineChartData);
        res.put("salesTypeData", salesTypeData);
        res.put("salesTypeDataOnline", salesTypeDataOnline);
        res.put("salesTypeDataOffline", salesTypeDataOffline);
        res.put("radarData", radarOriginData);          
        AjaxResult ajax = AjaxResult.success();
        ajax.put("data", res);
        return ajax;       
    }
}
