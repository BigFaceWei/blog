package com.wxy.model;

import java.util.ArrayList;
import java.util.List;

public class SlideExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SlideExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andSlideIdIsNull() {
            addCriterion("slide_id is null");
            return (Criteria) this;
        }

        public Criteria andSlideIdIsNotNull() {
            addCriterion("slide_id is not null");
            return (Criteria) this;
        }

        public Criteria andSlideIdEqualTo(Integer value) {
            addCriterion("slide_id =", value, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdNotEqualTo(Integer value) {
            addCriterion("slide_id <>", value, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdGreaterThan(Integer value) {
            addCriterion("slide_id >", value, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("slide_id >=", value, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdLessThan(Integer value) {
            addCriterion("slide_id <", value, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdLessThanOrEqualTo(Integer value) {
            addCriterion("slide_id <=", value, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdIn(List<Integer> values) {
            addCriterion("slide_id in", values, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdNotIn(List<Integer> values) {
            addCriterion("slide_id not in", values, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdBetween(Integer value1, Integer value2) {
            addCriterion("slide_id between", value1, value2, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideIdNotBetween(Integer value1, Integer value2) {
            addCriterion("slide_id not between", value1, value2, "slideId");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlIsNull() {
            addCriterion("slide_img_url is null");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlIsNotNull() {
            addCriterion("slide_img_url is not null");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlEqualTo(String value) {
            addCriterion("slide_img_url =", value, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlNotEqualTo(String value) {
            addCriterion("slide_img_url <>", value, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlGreaterThan(String value) {
            addCriterion("slide_img_url >", value, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlGreaterThanOrEqualTo(String value) {
            addCriterion("slide_img_url >=", value, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlLessThan(String value) {
            addCriterion("slide_img_url <", value, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlLessThanOrEqualTo(String value) {
            addCriterion("slide_img_url <=", value, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlLike(String value) {
            addCriterion("slide_img_url like", value, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlNotLike(String value) {
            addCriterion("slide_img_url not like", value, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlIn(List<String> values) {
            addCriterion("slide_img_url in", values, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlNotIn(List<String> values) {
            addCriterion("slide_img_url not in", values, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlBetween(String value1, String value2) {
            addCriterion("slide_img_url between", value1, value2, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideImgUrlNotBetween(String value1, String value2) {
            addCriterion("slide_img_url not between", value1, value2, "slideImgUrl");
            return (Criteria) this;
        }

        public Criteria andSlideDescIsNull() {
            addCriterion("slide_desc is null");
            return (Criteria) this;
        }

        public Criteria andSlideDescIsNotNull() {
            addCriterion("slide_desc is not null");
            return (Criteria) this;
        }

        public Criteria andSlideDescEqualTo(String value) {
            addCriterion("slide_desc =", value, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescNotEqualTo(String value) {
            addCriterion("slide_desc <>", value, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescGreaterThan(String value) {
            addCriterion("slide_desc >", value, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescGreaterThanOrEqualTo(String value) {
            addCriterion("slide_desc >=", value, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescLessThan(String value) {
            addCriterion("slide_desc <", value, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescLessThanOrEqualTo(String value) {
            addCriterion("slide_desc <=", value, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescLike(String value) {
            addCriterion("slide_desc like", value, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescNotLike(String value) {
            addCriterion("slide_desc not like", value, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescIn(List<String> values) {
            addCriterion("slide_desc in", values, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescNotIn(List<String> values) {
            addCriterion("slide_desc not in", values, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescBetween(String value1, String value2) {
            addCriterion("slide_desc between", value1, value2, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideDescNotBetween(String value1, String value2) {
            addCriterion("slide_desc not between", value1, value2, "slideDesc");
            return (Criteria) this;
        }

        public Criteria andSlideReserveIsNull() {
            addCriterion("slide_reserve is null");
            return (Criteria) this;
        }

        public Criteria andSlideReserveIsNotNull() {
            addCriterion("slide_reserve is not null");
            return (Criteria) this;
        }

        public Criteria andSlideReserveEqualTo(String value) {
            addCriterion("slide_reserve =", value, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveNotEqualTo(String value) {
            addCriterion("slide_reserve <>", value, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveGreaterThan(String value) {
            addCriterion("slide_reserve >", value, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveGreaterThanOrEqualTo(String value) {
            addCriterion("slide_reserve >=", value, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveLessThan(String value) {
            addCriterion("slide_reserve <", value, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveLessThanOrEqualTo(String value) {
            addCriterion("slide_reserve <=", value, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveLike(String value) {
            addCriterion("slide_reserve like", value, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveNotLike(String value) {
            addCriterion("slide_reserve not like", value, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveIn(List<String> values) {
            addCriterion("slide_reserve in", values, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveNotIn(List<String> values) {
            addCriterion("slide_reserve not in", values, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveBetween(String value1, String value2) {
            addCriterion("slide_reserve between", value1, value2, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideReserveNotBetween(String value1, String value2) {
            addCriterion("slide_reserve not between", value1, value2, "slideReserve");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeIsNull() {
            addCriterion("slide_update_time is null");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeIsNotNull() {
            addCriterion("slide_update_time is not null");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeEqualTo(String value) {
            addCriterion("slide_update_time =", value, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeNotEqualTo(String value) {
            addCriterion("slide_update_time <>", value, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeGreaterThan(String value) {
            addCriterion("slide_update_time >", value, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeGreaterThanOrEqualTo(String value) {
            addCriterion("slide_update_time >=", value, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeLessThan(String value) {
            addCriterion("slide_update_time <", value, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeLessThanOrEqualTo(String value) {
            addCriterion("slide_update_time <=", value, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeLike(String value) {
            addCriterion("slide_update_time like", value, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeNotLike(String value) {
            addCriterion("slide_update_time not like", value, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeIn(List<String> values) {
            addCriterion("slide_update_time in", values, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeNotIn(List<String> values) {
            addCriterion("slide_update_time not in", values, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeBetween(String value1, String value2) {
            addCriterion("slide_update_time between", value1, value2, "slideUpdateTime");
            return (Criteria) this;
        }

        public Criteria andSlideUpdateTimeNotBetween(String value1, String value2) {
            addCriterion("slide_update_time not between", value1, value2, "slideUpdateTime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}