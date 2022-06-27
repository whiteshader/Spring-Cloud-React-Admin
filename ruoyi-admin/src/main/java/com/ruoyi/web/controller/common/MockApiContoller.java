package com.ruoyi.web.controller.common;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.utils.DateUtils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MockApiContoller {
    String[] titles = new String[] {
            "Alipay",
            "Angular",
            "Ant Design",
            "Ant Design Pro",
            "Bootstrap",
            "React",
            "Vue",
            "Webpack",
    };
    String[] avatars = new String[] {
            "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", // Alipay
            "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", // Angular
            "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", // Ant Design
            "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", // Ant Design Pro
            "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", // Bootstrap
            "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", // React
            "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", // Vue
            "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png", // Webpack
    };

    String[] covers = new String[] {
            "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
            "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
            "https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png",
            "https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png",
    };
    String[] desc = new String[] {
            "那是一种内在的东西， 他们到达不了，也无法触及的",
            "希望是一个好东西，也许是最好的，好东西是不会消亡的",
            "生命就像一盒巧克力，结果往往出人意料",
            "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
            "那时候我只会想自己想要什么，从不想自己拥有什么",
    };

    String[] user = new String[] {
            "付小小",
            "曲丽丽",
            "林东东",
            "周星星",
            "吴加好",
            "朱偏右",
            "鱼酱",
            "乐哥",
            "谭小仪",
            "仲尼",
    };
    @GetMapping("/fake_list_Detail")
    public AjaxResult getFakeListDetail() {
        JSONArray info = new JSONArray();
        for(int i = 0 ; i < 20 ; i ++) {
            JSONObject item = new JSONObject();
            item.put("id", "fake-list-" + i);
            item.put("owner", user[i % 10]);
            item.put("title", titles[i % 8]);
            item.put("avatar", avatars[i % 8]);
            item.put("cover", covers[i % 4]);
            item.put("status", "active");
            item.put("percent", Math.ceil(Math.random() * 50) + 50);
            item.put("logo", avatars[i % 8]);
            item.put("href", "https://ant.design");
            item.put("description", "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。");
            item.put("content", "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。");
            item.put("activeUser", Math.ceil(Math.random() * 100000) + 100000);
            item.put("newUser", Math.ceil(Math.random() * 1000) + 1000);
            item.put("star", Math.ceil(Math.random() * 100) + 100);
            item.put("like", Math.ceil(Math.random() * 100) + 100);
            item.put("message", Math.ceil(Math.random() * 10) + 10);
            JSONArray members = new JSONArray();
            item.put("members", members);
            info.add(item);
        }

        JSONObject list = new JSONObject();
        list.put("list", info);
        AjaxResult ajax = AjaxResult.success();
        ajax.put("data", list);
        return ajax;
    }

    @GetMapping("/notices")
    public AjaxResult getNoticeData() {
        JSONArray info = new JSONArray();
        JSONObject item = new JSONObject();
        item.put("id", "000000012");
        item.put("avatar", avatars[0]);
        item.put("title", "ABCD 版本发布");
        item.put("description", "提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务");
        item.put("extra", "进行中");
        item.put("status", "processing");
        item.put("type", "event");
        info.add(item);

        item = new JSONObject();
        item.put("id", "000000006");
        item.put("avatar", avatars[1]);
        item.put("title", "左侧图标用于区分不同的类型");
        item.put("datetime", "2022-01-07");
        item.put("type", "notification");
        info.add(item);

        item = new JSONObject();
        item.put("id", "000000006");
        item.put("avatar", avatars[2]);
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

    @GetMapping("/tags")
    public AjaxResult getTags() {
        JSONArray taglist = new JSONArray();
        JSONObject item = new JSONObject();
        item.put("name", "离岛");
        item.put("type", "1");
        item.put("value", "19");
        taglist.add(item);

        item = new JSONObject();
        item.put("name", "大同市");
        item.put("type", "1");
        item.put("value", "68");
        taglist.add(item);

        item = new JSONObject();
        item.put("name", "三亚市");
        item.put("type", "0");
        item.put("value", "42");
        taglist.add(item);

        JSONObject list = new JSONObject();
        list.put("list", taglist);
        AjaxResult ajax = AjaxResult.success();
        ajax.put("data", list);
        return ajax;
    }

    @GetMapping("/project/notice")
    public AjaxResult getProjectNotice() {
        JSONArray info = new JSONArray();
        JSONObject item = new JSONObject();
        item.put("id", "xxx1");
        item.put("logo", avatars[0]);
        item.put("title", "Alipay");
        item.put("description", "那是一种内在的东西，他们到达不了，也无法触及的");
        item.put("updatedAt", DateUtils.getTime());
        item.put("member", "科学搬砖组");
        item.put("href", "");
        item.put("memberLink", "");
        info.add(item);

        item = new JSONObject();
        item.put("id", "xxx2");
        item.put("logo", avatars[1]);
        item.put("title", "Angular");
        item.put("description", "希望是一个好东西，也许是最好的，好东西是不会消亡的");
        item.put("updatedAt", DateUtils.getTime());
        item.put("member", "全组都是吴彦祖");
        item.put("href", "");
        item.put("memberLink", "");
        info.add(item);

        item = new JSONObject();
        item.put("id", "xxx3");
        item.put("logo", avatars[2]);
        item.put("title", "Ant Design");
        item.put("description", "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆");
        item.put("updatedAt", DateUtils.getTime());
        item.put("member", "中二少女团");
        item.put("href", "");
        item.put("memberLink", "");
        info.add(item);

        item = new JSONObject();
        item.put("id", "xxx4");
        item.put("logo", avatars[3]);
        item.put("title", "Bootstrap");
        item.put("description", "那时候我只会想自己想要什么，从不想自己拥有什么");
        item.put("updatedAt", DateUtils.getTime());
        item.put("member", "程序员日常");
        item.put("href", "");
        item.put("memberLink", "");
        info.add(item);

        item = new JSONObject();
        item.put("id", "xxx5");
        item.put("logo", avatars[4]);
        item.put("title", "React");
        item.put("description", "凛冬将至");
        item.put("updatedAt", DateUtils.getTime());
        item.put("member", "高逼格设计天团");
        item.put("href", "");
        item.put("memberLink", "");
        info.add(item);

        item = new JSONObject();
        item.put("id", "xxx6");
        item.put("logo", avatars[5]);
        item.put("title", "Webpack");
        item.put("description", "生命就像一盒巧克力，结果往往出人意料");
        item.put("updatedAt", DateUtils.getTime());
        item.put("member", "程序员日常");
        item.put("href", "");
        item.put("memberLink", "");
        info.add(item);

        AjaxResult ajax = AjaxResult.success();
        ajax.put("data", info);
        return ajax;
    }

    @GetMapping("/activities")
    public AjaxResult getActivities() {
        JSONArray list = new JSONArray();
        JSONObject item = new JSONObject();
        item.put("id", "trend-1");
        item.put("updatedAt", DateUtils.getTime());
        JSONObject user = new JSONObject();
        user.put("name", "曲丽丽");
        user.put("avatar", avatars[2]);
        item.put("user", user);
        JSONObject group = new JSONObject();
        user.put("name", "高逼格设计天团");
        user.put("link", "http://github.com/");
        item.put("group", group);
        JSONObject project = new JSONObject();
        user.put("name", "六月迭代");
        user.put("link", "http://github.com/");
        item.put("project", project);
        item.put("template", "在 @{group} 新建项目 @{project}");
        list.add(item);

        item = new JSONObject();
        item.put("id", "trend-2");
        item.put("updatedAt", DateUtils.getTime());
        user = new JSONObject();
        user.put("name", "付小小");
        user.put("avatar", avatars[1]);
        item.put("user", user);
        group = new JSONObject();
        user.put("name", "高逼格设计天团");
        user.put("link", "http://github.com/");
        item.put("group", group);
        project = new JSONObject();
        user.put("name", "六月迭代");
        user.put("link", "http://github.com/");
        item.put("project", project);
        item.put("template", "在 @{group} 新建项目 @{project}");
        list.add(item);

        item = new JSONObject();
        item.put("id", "trend-3");
        item.put("updatedAt", DateUtils.getTime());
        user = new JSONObject();
        user.put("name", "林东东");
        user.put("avatar", avatars[3]);
        item.put("user", user);
        group = new JSONObject();
        user.put("name", "中二少女团");
        user.put("link", "http://github.com/");
        item.put("group", group);
        project = new JSONObject();
        user.put("name", "六月迭代");
        user.put("link", "http://github.com/");
        item.put("project", project);
        item.put("template", "在 @{group} 新建项目 @{project}");
        list.add(item);

        AjaxResult ajax = AjaxResult.success();
        ajax.put("data", list);
        return ajax;
    }

    @GetMapping("/fake_workplace_chart_data")
    public AjaxResult getWorkplaceChartData() {
        return getChartData("work");
    }

    @GetMapping("/fake_analysis_chart_data")
    public AjaxResult getAnalysisChartData() {
        return getChartData("analysis");
    }

    public AjaxResult getChartData(String type) {
        JSONArray visitData = new JSONArray();
        int[] fakeY = { 7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5 };
        for (int i = 0; i < fakeY.length; i += 1) {
            JSONObject item = new JSONObject();
            Date d = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * i);
            item.put("x", DateUtils.dateTime(d));
            item.put("y", fakeY[i]);
            visitData.add(item);
        }

        JSONArray visitData2 = new JSONArray();
        int[] fakeY2 = { 1, 6, 4, 8, 3, 7, 2 };
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
            item.put("y", Math.floor(Math.random() * 1000 + 200));
            salesData.add(item);
        }

        JSONArray searchData = new JSONArray();
        for (Integer i = 0; i < 50; i += 1) {
            JSONObject item = new JSONObject();
            item.put("index", i + 1);
            item.put("keyword", "搜索关键词-" + i.toString());
            item.put("count", Math.floor(Math.random() * 1000));
            item.put("range", Math.floor(Math.random() * 1000));
            item.put("status", Math.floor(Math.random() * 1000));
            searchData.add(item);
        }

        JSONArray offlineData = new JSONArray();
        for (Integer i = 1; i <= 50; i += 1) {
            JSONObject item = new JSONObject();
            item.put("name", "Stores " + i.toString());
            item.put("cvr", Math.ceil(Math.random() * 9 / 10));
            offlineData.add(item);
        }

        JSONArray offlineChartData = new JSONArray();
        if (type.equals("work")) {
            for (Integer i = 1; i <= 50; i += 1) {
                JSONObject item = new JSONObject();
                item.put("x", new Date().getTime() + 1000 * 60 * 60 * i);
                item.put("y1", Math.floor(Math.random() * 1000) + 10);
                item.put("y2", Math.floor(Math.random() * 1000) + 10);
                offlineChartData.add(item);
            }
        } else {
            for (Integer i = 1; i <= 20; i += 1) {
                JSONObject item = new JSONObject();
                String date = DateUtils.parseDateToStr("HH:mm", new Date(new Date().getTime() + 1000 * 60 * 60 * i));
                item.put("date", date);
                item.put("type", "客流量");
                item.put("value", Math.floor(Math.random() * 100) + 10);

                item = new JSONObject();
                item.put("date", date);
                item.put("type", "支付笔数");
                item.put("value", Math.floor(Math.random() * 100) + 10);
                offlineChartData.add(item);
            }
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
        if (type.equals("work")) {

            ArrayList<String> radarTypes = new ArrayList<>();
            radarTypes.add("个人");
            radarTypes.add("团队");
            radarTypes.add("部门");

            Map<String, String> radarTitleMap = new HashMap<>();
            radarTitleMap.put("ref", "引用");
            radarTitleMap.put("koubei", "口碑");
            radarTitleMap.put("output", "产量");
            radarTitleMap.put("contribute", "贡献");
            radarTitleMap.put("hot", "热度");

            for (String radarType : radarTypes) {
                for (Entry<String, String> key : radarTitleMap.entrySet()) {
                    item = new JSONObject();
                    item.put("name", radarType);
                    item.put("label", key.getValue());
                    item.put("value", Math.floor(Math.random() * 10));
                    radarOriginData.add(item);
                }
            }

            radarOriginData.add(item);
        } else {
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
        }

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
