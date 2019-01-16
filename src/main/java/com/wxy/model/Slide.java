package com.wxy.model;

public class Slide {
    private Integer slideId;

    private String slideImgUrl;

    private String slideDesc;

    private String slideReserve;

    private String slideUpdateTime;

    public Integer getSlideId() {
        return slideId;
    }

    public void setSlideId(Integer slideId) {
        this.slideId = slideId;
    }

    public String getSlideImgUrl() {
        return slideImgUrl;
    }

    public void setSlideImgUrl(String slideImgUrl) {
        this.slideImgUrl = slideImgUrl == null ? null : slideImgUrl.trim();
    }

    public String getSlideDesc() {
        return slideDesc;
    }

    public void setSlideDesc(String slideDesc) {
        this.slideDesc = slideDesc == null ? null : slideDesc.trim();
    }

    public String getSlideReserve() {
        return slideReserve;
    }

    public void setSlideReserve(String slideReserve) {
        this.slideReserve = slideReserve == null ? null : slideReserve.trim();
    }

    public String getSlideUpdateTime() {
        return slideUpdateTime;
    }

    public void setSlideUpdateTime(String slideUpdateTime) {
        this.slideUpdateTime = slideUpdateTime == null ? null : slideUpdateTime.trim();
    }
}