/**
 * 1�����¶�������߲������������ļ������¸�ֵ
 *    ����ĳ�ʼ�������У�
 *		 data_precision:��ֵ���ȣ���ȷ��С������λ��
 *		 up_limit����������ֵ�ο���
 *		 down_limit����������ֵ�ο���
 *		 standard_limit����׼����ֵ(��ƽ��ֵ)
 *		 y_min��y����Сֵ
 *		 y_max��y�����ֵ
 *		 y_value_per_step��y���ǩ����
 *    ���ϲ���Ϊ����ģ��ڻ�ȡ����������ֻҪ����һ���쳣��ֹͣ��������
 *    ����ֻ���Ƴ�����������������ʾ��
 * 2���ؼ��������Ϊmain����
 * 3��ҳ��ű�get_param_for_curve()��get_curve_data()���������ֱ�
 * 	  ������ȡ��ʼ��������ĳ�����ߵ���ֵ����
 * 4���ؼ�֧�ָ�ֵ���ݣ���y_min�������õ���ֵ��Χ���ɻ�����ֵС��0����
 * 	  �ߣ�x������λ�û��Զ�У׼��y=0��λ�û�y_min��λ�ã���y_min>0��
 * 5������ű����ݲ���ʱ���ڷ������˰��ն�Ӧ���ݵĵ�ѹ�ȼ��趨���ʵ�
 * 	  �����ޣ�y_min��y_max����Χ��������ʾ�������ȿɿص�����
 * 6��y���ǩ�������Ϊ���ʵ�����ֵ������߽ű���ִ��Ч��
 */
 
//=================ȫ�ֱ���================
var svg_doc=null;			//svg��document����
var bg_group=null;	    //����������
var grid_group=null;	    //����������
var curve_group=null;	    //������
var text_group=null;		//��ʾ�ı���
var axis_group=null;		//��������

var curve_param="";
var curve_title="����";		//���߱���
var is_dynamic = 1;         //�Ƿ�̬���ɱ���
var is_show_union = 0;
var x_union="ʱ��";         //x��˵����ǩ
var y_union="��ֵ";		    //y��˵����ǩ
var label_visible="1";      //�Ƿ���ʾ����˵����ǩ
var maxminbetween_visible="0"; //�Ƿ���ʾ���������С��ֵ��
var maxminaver_showline_visible="1"; //�Ƿ���������ʾ��Ϣֵ(1��0��)

//��ͼ����۲���
var curve_width=800;      	//��ͼ�����
var curve_height=500;     	//��ͼ���߶�
var curve_border_color="#000000";  //��ͼ��߿���ɫ
var curve_widhei_iscalc=0;  //��ͼ�����Ƿ�����Ӧ
var curve_left=0;		  	//��ͼ����߽�
var curve_top=0;		  	//��ͼ���ϱ߽�
var line_left_blank=80;   	//��������߾�
var line_right_blank=120;  	//�������ұ߾�
var line_top_blank=50;    	//�������ϱ߾�
var line_bottom_blank=90; 	//�������±߾�
var is_show_circle="0";     //�Ƿ���ʾ���ӵ�(1��0��)
var x_label_down_blank=60;	//x���ǩ�±߾�
var y_label_left_blank=30;	//y���ǩ��߾�


//���߻�����ز���
var curve_arr=new Array();	    //������
var curve_name_arr = new Array();
var curve_val_arr = new Array();
var curve_begin_time_arr = new Array();
var curve_end_time_arr = new Array();
var label_arr = new Array(); 
var color_array=["red","green","blue","#FF00CC","orange","#00FFCC","navy","blue","blue","blue"]; //������ɫ
var time_format_array=['����','����','����','ȥ��'];
var is_showdate = 0;
var data_unit = 0;
var curve_size=1.5; //���߿��
var data_precision=3;						//��ֵ����:������С��λ��
var up_limit=90;							//��������ֵ
var down_limit=50;							//��������ֵ
var standard_limit=70;						//��׼����ֵ

var y_min_iscalc=1;							//�Ƿ�����������ȷ��y����Сֵ
var y_max_iscalc=1;							//�Ƿ�����������ȷ��y�����ֵ
var y_min=0;	           					//y����Сֵ
var y_max=100;            					//y�����ֵ
var maxY1;                                  //y����ʵ���ֵ������*0.1�ģ�
var minY1;                                  //y����ʵ��Сֵ������*0.1�ģ�
var y_rea_max;                              //����y�����ֵ
var y_rea_min;                              //����y����Сֵ
var y_value_per_step=0.5;    				//y���ǩ����
var y_value_per_step_number=10;				//y���ǩ����
var y_value_per_step_formulas
	=(y_max - y_min)/y_value_per_step_number;//y���ǩ��ֵ������㹫ʽ
var y_precision=0;                          //y���ǩ����

var y_value_visible = 1;					//�Ƿ���ʾy���ǩ

var today = new Date();
var x_begin_time = new Date(today.getFullYear(),today.getMonth(),today.getDate()); //x�Ὺʼʱ��
var x_end_time = new Date(x_begin_time.getTime()+24*60*60*1000); //x�����ʱ��
var x_value_per_step=240;    				//x���ǩ����
var x_value_visible = 1;					//�Ƿ���ʾx���ǩ
var data_interval = 15; //�������ݼ��(��λ:����)
var label_blank = 70;
var label_rect_blank = 20;


//�����쳣ֵ��Χ(��ѡ���ڻ�������ʱ�����쳣ֵ����������������ָ�����εķ�Χ)
var is_mask_ex=0;			//�Ƿ������쳣ֵ
var up_overflow=0.1;			//��������ֵ10%
var down_overflow=0.1;			//��������ֵ10%


//��ʾ�ߡ���ʾ�ı���ز���
var y_offset_to_cursor=40;		//��ʾ����ʾ�ı�������·���ƫ����
var x_offset_to_cursor=10;		//��ʾ����ʾ�ı��������ߵ�ƫ����
var tip_msg_font_size = 20;      //���������ʾ�ı������С
var tip_msg_font_color = "";      //���������ʾ�ı�������ɫ
var tip_msg_date_color = "red";   //���������ʾ����������ɫ

var refresh_interval=0; //ͼ��ˢ�¼��(��λ:��) �����㲻ˢ�� 

//��ʽ����
//������ʼ������ɫ
var bg_start_style="stop-color:#C4E1FF;stop-opacity:0.8;";
//������ֹ������ɫ
var bg_end_style="stop-color:#C4E1FF;stop-opacity:0;";
//������������ʽ
var grid_sty="fill:#CCCCCC;";
//�������ͷ��ʽ
var marker_style="fill:#FF0000;stroke:#FF0000;stroke-width:1;";
//x����ʽ
var x_axis_style="stroke:#FF0000;stroke-width:2;marker-end:url(#end_arrow)";
//y����ʽ
var y_axis_style="stroke:#FF0000;stroke-width:2;marker-end:url(#end_arrow)";
//x���ǩ��ʽ
var x_label_sty="font-size:16;font-family:simsun;stroke:#000000;stroke-size:1;";
//y���ǩ��ʽ
var y_label_sty="font-size:16;font-family:simsun;stroke:#000000;stroke-size:1;";
//������ʽ
var title_sty="fill:blue;font-size:20;font-family:simsun;stroke:blue;stroke-size:1;";
//��λ�ı���ʽ
var union_sty="font-size:16;font-family:simsun;stroke:#000000;stroke-size:2;";
//���������ʾ����ʽ
var tip_line_sty="fill:#FF0000;stroke:red;stroke-width:2;";
//�ı���Ӱ����ʽ
var tip_box_sty="fill:#C4E1FF;stroke:#000000;stroke-size:1;fill-opacity:0.8;";
//������ʾ��Ϣ��ʽ
var err_msg_sty="fill:red;font-size:16;font-family:simsun;stroke:red;stroke-size:2;";

var line_width=curve_width-line_left_blank-line_right_blank;  //���������
var line_height=curve_height-line_top_blank-line_bottom_blank;//�������߶�

//����xy����ʼ����ֹ������
var x_axis_x1=line_left_blank;
var x_axis_y1=curve_height-line_bottom_blank;
var x_axis_x2=curve_width-line_right_blank;
var x_axis_y2=curve_height-line_bottom_blank;

var y_axis_x1=line_left_blank;
var y_axis_y1=curve_height-line_bottom_blank;
var y_axis_x2=line_left_blank;
var y_axis_y2=line_top_blank;

var y_steps=(y_max-y_min)/y_value_per_step;	//y���ǩ�ܲ���
var y_step_pels=(curve_height-line_top_blank-line_bottom_blank)/y_steps;   //y��ÿ��������

var total_time = (x_end_time-x_begin_time)/(60*1000); //x��ʱ�䳤��
var x_steps=total_time/data_interval;		//x���ܲ���
var x_label_steps=total_time/x_value_per_step;	//x���ǩ�ܲ���
var x_step_pels=(curve_width-line_left_blank-line_right_blank)/x_steps;    //x��ÿ��������
var curveBeginTime;                                  //x�Ὺʼʱ��

function reset_param() {
	if(curve_widhei_iscalc === 1){
		curve_height = $("body").innerHeight() - 2 * $('embed')[0].offsetTop; 
		curve_width = $("body").innerWidth() - 2 * $('embed')[0].offsetLeft; 
		if(maxminbetween_visible == 1){
			curve_height = curve_height - 30;
		}
	}
	line_width=curve_width-line_left_blank-line_right_blank;  //���������
	line_height=curve_height-line_top_blank-line_bottom_blank;//�������߶�

	//����xy����ʼ����ֹ������
	x_axis_x1=line_left_blank;
	x_axis_y1=curve_height-line_bottom_blank;
	x_axis_x2=curve_width-line_right_blank;
	x_axis_y2=curve_height-line_bottom_blank;

	y_axis_x1=line_left_blank;
	y_axis_y1=curve_height-line_bottom_blank;
	y_axis_x2=line_left_blank;
	y_axis_y2=line_top_blank;
	
	
	y_steps=(y_max-y_min)/y_value_per_step;	//y���ǩ�ܲ���
	y_step_pels=(curve_height-line_top_blank-line_bottom_blank)/y_steps;   //y��ÿ��������

	total_time = (x_end_time-x_begin_time)/(60*1000); //x��ʱ�䳤��
	x_steps=total_time/data_interval;		//x���ܲ���
	x_label_steps=total_time/x_value_per_step;	//x���ǩ�ܲ���
	x_step_pels=(curve_width-line_left_blank-line_right_blank)/x_steps;    //x��ÿ��������
	$('embed').height(curve_height);
}

//===================================���߶���===================================
/**
 * ���߶���
 * �ö���Ϊ�������ߵĺ��Ķ���
 * �ⲿ�����ڻ�ͼʱ��Ӧ�������ɸö����ʵ��
 * �����ɵ�ʵ�����浽curve_arr������
 * �����û�ͼ�������һ�����ߵĻ���
 */
function curve(){
	this.x_values=new Array();				//����x����ֵ����
	this.y_values=new Array();				//����y����ֵ����
	this.color="#000000";					//����Ĭ����ʾ��ɫ 
	this.mask_flag=is_mask_ex;					//�Ƿ���a���쳣ֵ
	this.size=curve_size;						    //���ߴ�ϸ
	this.line_group_id=null;				//������id
	this.name=null;							//��������
	this.create_line=create_curve_line;		//�����Լ�
}

//=====================================���ߺ���=================================
/**
 * ���ݾ��ȸ�ʽ��
 * source:��Ҫ��ʽ��������
 * n:������С��λ��
 */
function data_format(source){
	if(source == null || source === "")
		return "";
	var val=Math.round(source*Math.pow(10,data_precision))/Math.pow(10,data_precision);
	return parseFloat(val);
}

/**
 * ��һ��ֱ��
 * ��ʼ������(x1,y1)
 * ����������(x2,y2)
 * sty:��ʽ(style)
 */
function create_line(x1,y1,x2,y2,sty,id){
	var line=svg_doc.createElement("line");
	if(id!=null){
		line.setAttribute("id",id);
	}
	line.setAttribute("Pointer-event",null);
	line.setAttribute("x1",x1);
	line.setAttribute("y1",y1);
	line.setAttribute("x2",x2);
	line.setAttribute("y2",y2);
	line.setAttribute("style",sty);
	return line;
}

function y_data_reset(){
	if(y_max_iscalc != 0) {
		y_max = curve_val_arr[0].split(",")[0];
		for(var i = 0; i < curve_val_arr.length; i++)
		{
			var line_value=curve_val_arr[i].split(",");
			for(var j = 0; j < line_value.length; j++)
			{
				if(parseFloat(line_value[j]) > parseFloat(y_max))
				{
					y_max = parseFloat(line_value[j]);
				}
				
			}
		}
	}
	if(y_min_iscalc != 0) {
		y_min = curve_val_arr[0].split(",")[0];
		for(var i = 0; i < curve_val_arr.length; i++)
		{
			var line_value=curve_val_arr[i].split(",");
			for(var j = 0; j < line_value.length; j++)
			{
				if(parseFloat(line_value[j]) < parseFloat(y_min))
				{
					y_min = parseFloat(line_value[j]);
				}
				
			}
		}
	}
	y_steps=(y_max-y_min)/y_value_per_step;
}

/**
 * x������ֵ��ʽ��
 * ����0��s_steps֮�������
 */
function x_data_format(x_value){
	var result=0;
	if(x_value<0){
		return result;
	}else if(x_value>x_steps){
		return x_steps;
	}else{
		result=parseInt(x_value);
		return result;
	}
}

/**
 * y�������ʽ��
 * ����y_min��y_max֮���ʵ��
 */
function y_data_format(y_value){
	var result=y_min;
	if(y_value<y_min){
		return y_min;
	}else if(y_value>y_max){
		return y_max;
	}else{
		return y_value;
	}
}

/**
 * ����xֵ��ø�ֵ�ڻ�ͼ����x����ֵ
 */
function get_x_pels(x_value){
	var result=x_axis_x1+x_value*x_step_pels;
	return result;
}

/**
 * ����yֵ��ø�ֵ�ڻ�ͼ����y����ֵ
 * ���򣺻�ͼ����ײ�λ��-�����yֵ�����y��Сֵ��ƫ����*ÿyֵ��������
 */
function get_y_pels(y_value){
	var temp_pels;
	if(y_max == y_min){
		temp_pels = 0;
	} else {
		temp_pels = (curve_height-line_top_blank-line_bottom_blank)/(y_max-y_min);
	}
	var result=0;
	result=(curve_height-line_bottom_blank)-(y_value-y_min)*temp_pels;
	return result;
}

/**
 * ����һ����ǩ
 */
function create_label(x,y,text_value,sty){
	var text_node=svg_doc.createElement("text");
	text_node.setAttribute("Pointer-event",null);
	text_node.setAttribute("x",x);
	text_node.setAttribute("y",y);
	text_node.setAttribute("style",sty);
	
	var text=svg_doc.createTextNode(text_value);
	
	text_node.appendChild(text);
	curve_group.appendChild(text_node);
}

/**
 * ����һ����ǩ(���ŵ�curve_group��)
 */
function create_label_nogroup(x,y,text_value,sty){
	var text_node=svg_doc.createElement("text");
	text_node.setAttribute("Pointer-event",null);
	text_node.setAttribute("x",x);
	text_node.setAttribute("y",y);
	text_node.setAttribute("style",sty);
	
	var text=svg_doc.createTextNode(text_value);
	text_node.appendChild(text);
	return text_node;
}

/**
 * (��ʾ---����)���ߺ���ʾ�ı�
 */
function hide_show_line(evt){
	var rect_obj=evt.target;
	var line_id=rect_obj.getAttribute("line_id");
	var is_show=rect_obj.getAttribute("is_show");
	var line_obj=svg_doc.getElementById(line_id);
	var text_obj=svg_doc.getElementById(line_id+"_text");
	if(is_show==1){
		line_obj.style.setProperty("opacity",0);
		text_obj.style.setProperty("opacity",0);
		rect_obj.style.setProperty("fill","#ffffff");
		rect_obj.setAttribute("is_show",0);
	}else{
		line_obj.style.setProperty("opacity",1);
		text_obj.style.setProperty("opacity",1);
		rect_obj.style.setProperty("fill",rect_obj.getAttribute("color_log"));
		rect_obj.setAttribute("is_show",1);
	}
}

/**
 * �����쳣ֵ
 * ��Χ��
 * 		���ޣ�����+��׼�ο�ֵ*0.1
 * 		���ޣ�����-��׼�ο�ֵ*0.1
 */
function mask_abnomal_value(x_values,y_values){
	var up_temp=up_limit*(1+up_overflow);
	var down_temp=down_limit*(1-down_overflow);
	var len=x_values.length;
	
	var x_value=0;
	var y_value=0;
	flag:
	for(var i=0;i<len;i++){
		x_value=x_values[i];
		y_value=y_values[i];
		if(x_value<0||x_value>x_steps){//����x��Ļ��Ʒ�Χ
			x_values[i]=null;
			y_values[i]=null;
			continue flag;
		}
		if(y_value<down_temp){
			x_values[i]=null;
			y_values[i]=null;
			continue flag;
		}
		if(y_value>up_temp){
			x_values[i]=null;
			y_values[i]=null;
			continue flag;
		}
	}
}

/**
 * ��������������һ������
 */
function add_curve(curve_obj){
	curve_arr.push(curve_obj);
}
		
/**
 * ��������
 * �ú������ʵ�ʻ������ߵĹ�����1�����������������߶����x��y����ֵ����������ߣ�
 * 							  2����������һ�����Ƹ������Ƿ���ʾ�Ŀ��Ʒ���
 * 							  3���ڶ�Ӧ���߷�����Ҳ�����������������Ƶ��ı�
 * x_values,y_values:���������
 * color��������ɫ
 * mask_flag���Ƿ������쳣ֵ
 * size:���ߴ�ϸ
 * line_group_id:������id
 */
function create_curve_line(x_values,y_values,color,mask_flag,size,line_group_id,line_name,count){
	//����У��
	if(x_values==null||y_values==null){
		alert("û��Ϊ����������ֵ��");
		return;
	}
	if(x_values.length!=y_values.length){
		alert("xy�������鳤�Ȳ�һ�£�");
		return;
	}
	//������ɫ
	var line_color="blue";
	if(color!=null){
		line_color=color;
	}
	var line_size="1.5";
	if(size!=null){
		line_size=size;
	}
	//�����쳣ֵ
	if(mask_flag==1){
		mask_abnomal_value(x_values,y_values);
	}
	//���ȸ�ʽ��
	var data_format_func=data_format;
	var y_values_len=y_values.length;
	for(var i=0;i<y_values_len;i++){
		y_values[i]=data_format_func(y_values[i]);
	}
	/**
	 * ����������
	 */
	var line_group=null;
	if(line_group_id!=null){
		line_group=svg_doc.createElement("g");
		line_group.setAttribute("id",line_group_id);
	}
	/**
	 * ��ʼ��������
	 * ���ƹ���
	 * 		1����ǰ��û��ֵ������������ѭ��
	 * 		2����ǰ����ֵ���¸�����ֵ���ڵ�ǰ��������¸������֮�����һ��ֱ��
	 * 		3����ǰ����ֵ�����¸���û��ֵ��������һ����
	 */
	var x1,y1,x2,y2;
	var x1_pels,y1_pels,x2_pels,y2_pels;
	var sty="fill:"+line_color+";stroke:"+line_color+";stroke-width:"+line_size+";";
	var x_values_len=x_values.length;
	var create_line_func=create_line;		//���溯��ָ��
	var get_x_pels_func=get_x_pels;
	var get_y_pels_func=get_y_pels;
	flag:
	for(var i=0;i<x_values_len;i++){
		x1=x_values[i];
		y1=y_values[i];
		x2=x_values[i+1];
		y2=y_values[i+1];
		if(x1==null||y1==null||isNaN(x1)||isNaN(y1)){	   //��ǰλ��ֵ�Ƿ�Ϸ�
			continue flag;
		}else if(x2===""||y2===""||x2==null||y2==null||isNaN(x2)||isNaN(y2)){//̽����һ��λ��ֵ�Ƿ�Ϸ�
			continue flag;
		}else if((x2!=null)&&(y2!=null)){
			x1_pels=get_x_pels_func(x1);
			x2_pels=get_x_pels_func(x2);
			y1_pels=get_y_pels_func(y1);
			y2_pels=get_y_pels_func(y2);
			var line=null;
			if(line_group!=null){
				line=create_line_func(x1_pels,y1_pels,x2_pels,y2_pels,sty);
				line_group.appendChild(line);
			}else{
				line=create_line_func(x1_pels,y1_pels,x2_pels,y2_pels,sty);
				curve_group.appendChild(line);
			}
			if (is_show_circle === 1){
		    	var circle_node=svg_doc.createElement("circle");
		    	circle_node.setAttribute("cx",x2_pels);
		    	circle_node.setAttribute("cy",y2_pels);
		    	circle_node.setAttribute("r",2);
		    	circle_node.setAttribute("style",sty);
		    	line_group.appendChild(circle_node);
		    	if(i === 0){
		    		circle_node=svg_doc.createElement("circle");
					circle_node.setAttribute("cx",x1_pels);
					circle_node.setAttribute("cy",y1_pels);
					circle_node.setAttribute("r",2);
			    	circle_node.setAttribute("style",sty);
			    	line_group.appendChild(circle_node);
		    	}
			}
		}else{
			x1_pels=get_x_pels_func(x1);
			y1_pels=get_y_pels_func(y1);
			var line=null;
			if(line_group!=null){
				line=create_line_func(x1_pels,y1_pels,x1_pels,y1_pels,sty);
				line_group.appendChild(line);
			}else{
				line=create_line_func(x1_pels,y1_pels,x1_pels,y1_pels,sty);
				curve_group.appendChild(line);
			}
		}
	}
	
	if(line_group!=null){
		curve_group.appendChild(line_group);
	}
	
	/**
	 * �����Ҳ��ǩ
	 */
	if(label_visible != 0) {
		if(line_group_id!=null){
			//�ڼ�������
			var index=line_group_id.toString().replace("line_group_","");
			index=parseInt(index);
			
			//x,y����ֵ
			var label_x=x_axis_x2 - parseFloat(label_blank);
			var lable_y=y_axis_y2 + 2 +20 * (index - 10);
			
			var rect_sty="fill:"+color+";stroke:red;stroke-width:1.1";
			var text_sty="fill:"+color+";stroke:"+color+";font-size:14;";
			var rect_node=svg_doc.createElement("rect");
			rect_node.setAttribute("x",label_x);
			rect_node.setAttribute("y",lable_y);
			rect_node.setAttribute("width",10);
			rect_node.setAttribute("height",10);
			rect_node.setAttribute("style",rect_sty);
			rect_node.setAttribute("color_log",color);
			rect_node.setAttribute("line_id",line_group_id);
			rect_node.setAttribute("is_show",1);
			rect_node.addEventListener("click",hide_show_line,false);
			curve_group.appendChild(rect_node);
			if(is_showdate === 1){
				create_label(label_x+10+parseFloat(label_rect_blank),lable_y+10,time_format_array[count],text_sty);
			} else {
				create_label(label_x+10+parseFloat(label_rect_blank),lable_y+10,line_name.split(" ")[0],text_sty);
			}
		}
	}
	/**
	 * ����һ����ʾ��Ϣ
	 */
	add_to_tip_group("",color,line_group_id);
}

//==================================��ʾ�ߡ���ʾ�ı�===========================
/**
 * ������굱ǰλ�ã������������飬�����ʾ��Ϣ
 * ��ʽ������������ʱ�䣨yyyy-mm-dd:hh24:mm:ss�� ��ֵ�� 
 * ��ȡ��1����������
 * 		2��ʱ�䣻
 * 		3��yֵ
 */
function get_tip_msg(x_pels){
	//��ȡÿ��������������yֵ
	var curve_arr_len=curve_arr.length;
	var modify_text_value_func=modify_text_value;//���溯��ָ��
	var y_value="";
	var tip="";
	for(var i=0;i<curve_arr_len;i++){
		var curve_obj=curve_arr[i];
		if(curve_obj!=null){
			//�������λ�ü����±�
			var x_index=parseInt((x_pels-x_axis_x1)/x_step_pels);
			var x_index_Time = new Date(curve_begin_time_arr[i]);
			if(data_unit == 1){
				x_index=Math.round((x_pels-x_axis_x1)/x_step_pels);
				x_index_Time.setDate(x_index_Time.getDate() + x_index);
			} else if (data_unit == 2){
				x_index=Math.round((x_pels-x_axis_x1)/x_step_pels);
				x_index_Time.setMonth(x_index_Time.getMonth()+x_index);
			} else {
			    x_index_Time.setMinutes(x_index_Time.getMinutes()+x_index*data_interval);
			}
			var time = new Date(x_index_Time).toLocaleDateString();
            var minute = x_index_Time.toLocaleTimeString();
			y_value=curve_obj.y_values[x_index];
			if(y_value===""||y_value==null||isNaN(y_value)){
				y_value="������";
			}
			var timestr = "";
			if(is_showdate === 1){
				timestr = time_format_array[i];
			} else if(data_unit == 2){
				timestr = time.substr(0,time.length-2);
			} else {
				timestr = time.substr(5);
			}
			tip=timestr+" "+y_value;
			modify_text_value_func(curve_obj.line_group_id+"_text",tip);
		}
		if(i === curve_arr_len - 1 && data_unit === 0){
			modify_text_value_func("tip_date_text",minute.substr(0,minute.length-3));
		}
	}
}

/**
 * �޸���ʾ��Ϣ����
 */
function modify_text_value(text_node_id,new_text){
	var text_node=svg_doc.getElementById(text_node_id);
	for(var i=0;i<text_node.childNodes.length;i++){
		text_node.removeChild(text_node.childNodes.item(i));
	}
	var text=svg_doc.createTextNode(new_text);
	text_node.appendChild(text);
}

/**
 * ����ʾ��Ϣ�����һ����ʾ��Ϣ
 */
function add_to_tip_group(text_value,color,line_group_id){
	var last_node=text_group.childNodes.item(text_group.childNodes.length-1);
	var msg_color = tip_msg_font_color;
	if(msg_color == "")
		msg_color = color;
	var tip_msg_sty="fill:"+msg_color+";font-size:"+tip_msg_font_size+";stroke:"+msg_color+";stroke-width:1.5;";
	var x_position=0;
	var y_position=0;
	if(last_node==null){									//�ı���ԭ��û������
		x_position=x_axis_x1;
		y_position=y_axis_y2+text_node.getBBox().height;
	}else{													//�Ѿ�������
		x_position=last_node.getAttribute("x");
		y_position=last_node.getAttribute("y")+last_node.getBBox().height;
	}
	
	var text_node=svg_doc.createElement("text");
	text_node.setAttribute("id",line_group_id+"_text");
	text_node.setAttribute("x",x_position);
	text_node.setAttribute("y",y_position);
	
	text_node.setAttribute("style",tip_msg_sty);	
	var text=svg_doc.createTextNode(text_value);
	text_node.appendChild(text);
	text_group.appendChild(text_node);
}

/**
 * �ƶ�һ���ı����е������ı�Ԫ�ص�λ�õ���ǰ���λ��
 * ��ˢ�µ�ǰλ�õ�ʱ��ֵ��y����ֵ
 */
function move_text_group(cx,cy){
	var node_list=text_group.childNodes;
	if(node_list==null){
		return;
	}
	/**
	 * ˢ�¶�Ӧ��ʱ��ֵ��yֵ
	 */
	get_tip_msg(cx);
	/**
	 * �ƶ��ı��������ı���λ��
	 */
	var node_list_len=node_list.length;
	var x_position=0;//x����
	var y_position=0;//y����
	if(cx>(curve_width-line_left_blank-line_width/2)){
		var max_text_width = 0;
		for(var i=0;i<node_list_len;i++){
			var text_node=node_list.item(i);
			if(max_text_width < text_node.getBBox().width)
				max_text_width = text_node.getBBox().width;
		}
		for(var i=0;i<node_list_len;i++){
			var text_node=node_list.item(i);
			x_position=cx-max_text_width-x_offset_to_cursor;
			text_node.setAttribute("x",x_position);
		}
	}else{
		for(var i=0;i<node_list_len;i++){
			var text_node=node_list.item(i);
			x_position=cx+x_offset_to_cursor;
			text_node.setAttribute("x",x_position);
		}
	}
	var tip_box=svg_doc.getElementById("tip_box");
	tip_box.setAttribute("x",x_position);
	var y_temp_min=99999999;
	var y_temp_max=-99999999;
	if(cy>(curve_height-line_bottom_blank-line_height/5)){
		for(var i=0;i<node_list_len;i++){
			var text_node=node_list.item(i);
			y_position=cy-(i+1)*text_node.getBBox().height;
			text_node.setAttribute("y",y_position);
			if(y_position>y_temp_max){
				y_temp_max=y_position;
			}
		}
		tip_box.setAttribute("y",parseInt(y_temp_max-tip_box.getAttribute("height"))+15);
	}else{
		for(var i=0;i<node_list_len;i++){
			var text_node=node_list.item(i);
			y_position=cy+y_offset_to_cursor+i*(text_node.getBBox().height+5);
			text_node.setAttribute("y",y_position);
			if(y_position<y_temp_min){
				y_temp_min=y_position;
			}
		}
		tip_box.setAttribute("y",parseInt(y_temp_min));
	}
	
	var width_temp=-99999999;
	var height_temp=20*(node_list_len-1);
	for(var i=0;i<node_list_len;i++){
		var text_node=node_list.item(i);
		if(text_node.getBBox().width>width_temp){
			width_temp=text_node.getBBox().width;
		}
	}
	tip_box.setAttribute("width",width_temp);
	tip_box.setAttribute("height",height_temp);		
}

/**
 *��ʾ�ߡ���ʾ�������� 
 */
function move_tipline_and_tipbox(evt){
	var cx=evt.clientX;
	var cy=evt.clientY;
	var tip_line=svg_doc.getElementById("tip_line");	
	var tip_line1=svg_doc.getElementById("tip_line1");
	if(tip_line != null && tip_line1 !=null) {
		if(cx>=x_axis_x1&&cx<x_axis_x2&&cy>=y_axis_y2&&cy<=y_axis_y1){
			text_group.setAttribute("visibility","visible");
			tip_line.setAttribute("visibility","visible");
			tip_line1.setAttribute("visibility","visible");
			//�ƶ���ʾ��λ��
			tip_line.setAttribute("x1",cx);
			tip_line.setAttribute("x2",cx);
			tip_line1.setAttribute("y1",cy);
			tip_line1.setAttribute("y2",cy);
			//�ƶ��ı����������ı���λ�ò����¸�ֵ
			move_text_group(cx,cy);
			
		}
		else {
			text_group.setAttribute("visibility","hidden");
			tip_line.setAttribute("visibility","hidden");
			tip_line1.setAttribute("visibility","hidden");
		}
	}
}

/**
 * ������������ʾ��
 */
function create_tipline(){
	//������ʾ��
	var tip_line=create_line(x_axis_x1,y_axis_y1,x_axis_x1,y_axis_y2,tip_line_sty,"tip_line");
	var tip_line1=create_line(x_axis_x1,0,x_axis_x2,0,tip_line_sty,"tip_line1");
	curve_group.appendChild(tip_line);
	curve_group.appendChild(tip_line1);
	tip_line.setAttribute("visibility","hidden");
	tip_line1.setAttribute("visibility","hidden");
	//������Ӱ��
	var tip_box=svg_doc.createElement("rect");
	tip_box.setAttribute("id","tip_box");
	tip_box.setAttribute("x",0);
	tip_box.setAttribute("y",0);
	tip_box.setAttribute("width",0);
	tip_box.setAttribute("height",80);
	tip_box.setAttribute("style",tip_box_sty);
	text_group.appendChild(tip_box);
	//�����¼�����
	bg_group.addEventListener("mousemove",move_tipline_and_tipbox,false);
	tip_line.addEventListener("mousemove",move_tipline_and_tipbox,false);
	tip_line1.addEventListener("mousemove",move_tipline_and_tipbox,false);
	grid_group.addEventListener("mousemove",move_tipline_and_tipbox,false);
}

function create_tip_date(){
	add_to_tip_group("",tip_msg_date_color,"tip_black");
	add_to_tip_group("",tip_msg_date_color,"tip_date");
}

//=====================================���Ʊ���==================================
//��ͼ��������ʼ��
function create_background(){
	//����һ����������
	var rect_obj=svg_doc.createElement("rect");
	rect_obj.setAttribute("x",curve_left);
	rect_obj.setAttribute("y",curve_top);
	rect_obj.setAttribute("width",curve_width);
	rect_obj.setAttribute("height",curve_height);
	rect_obj.setAttribute("style","fill:url(#line_gradient);stroke:"+curve_border_color+";stroke-width:2;");
	bg_group.appendChild(rect_obj);
}

function create_axis(){
	//����x��
	var x_axis=create_line(x_axis_x1,x_axis_y1 * (1 + up_overflow),x_axis_x2,x_axis_y2,x_axis_style,"x_axis");
	axis_group.appendChild(x_axis);
	//����y��
	var y_axis=create_line(y_axis_x1,y_axis_y1,y_axis_x2,y_axis_y2,y_axis_style,"y_axis");
	axis_group.appendChild(y_axis);
}

function reset_x_param(){
    if(data_unit == 1){
    	x_label_steps = new Date(curveBeginTime.getFullYear(),curveBeginTime.getMonth()+1,0).getDate() - 1;
    	x_steps = new Date(curveBeginTime.getFullYear(),curveBeginTime.getMonth()+1,0).getDate() - 1;
    	x_step_pels=(curve_width-line_left_blank-line_right_blank)/x_steps;
    } else if(data_unit == 2){
    	x_label_steps = x_steps =11;
    	x_step_pels=(curve_width-line_left_blank-line_right_blank)/x_steps;
    }
}
/**
 * x��λ�����¶�׼
 * ����1��y_min<=0��x��λ�ö�׼��y=0
 * 		 2��y_min>0��x��λ�ö�׼��y_min
 */
function aim_x_axis(){
	var x_axis_obj=svg_doc.getElementById("x_axis");
	var y_pels=get_y_pels(y_min);
	x_axis_obj.setAttribute("y1",y_pels);
	x_axis_obj.setAttribute("y2",y_pels);
}

/**
 * ����������
 */
function create_grid(){
	var x1,y1,x2,y2;
	if(y_value_per_step_number !=''){
		y_steps = y_value_per_step_number;//����y��������
		y_step_pels=(curve_height-line_top_blank-line_bottom_blank)/y_steps;//y��ÿ��������
	}
	//ƽ����y���ֱ��
	for(var i=0;i<=x_label_steps;i++){
		x1=x_axis_x1+x_step_pels*(x_steps/x_label_steps)*i;
		y1=x_axis_y1;
		x2=x1;
		y2=y_axis_y2 * (1 - down_overflow);
		var temp_line=create_line(x1,y1,x2,y2,grid_sty);
		grid_group.appendChild(temp_line);
	}
	//ƽ����x���ֱ��(���һ�������⴦��)
	for(var i=1;i<y_steps;i++){
		x1=x_axis_x1;
		if(i > y_steps)
			y1=y_axis_y2;
		else
			y1=y_axis_y1-y_step_pels*i;
		x2=x_axis_x2;
		y2=y1;
		var temp_line=create_line(x1,y1,x2,y2,grid_sty);
		grid_group.appendChild(temp_line);
	}
	var temp_line = create_line(x_axis_x1,y_axis_y2 * (1 - down_overflow),x_axis_x2,y_axis_y2 * (1 - down_overflow),grid_sty);
	grid_group.appendChild(temp_line);
}

/**
 * ����x���ǩ
 */
function create_x_label(){
	var y=curve_height-x_label_down_blank;
	var x_index_Time; 
	for(var i=0;i<=x_label_steps;i++){
		var x_value=0+i*(x_steps/x_label_steps);
		var x=get_x_pels(x_value);
		var time;
		if(data_unit === 0){
			x_index_Time = new Date(x_begin_time);
			x_index_Time.setMinutes(x_index_Time.getMinutes()+x_value*data_interval)
			time = x_index_Time.getHours();
			if(time === 0 && i == x_label_steps)
				time = 24;
		} else if(data_unit === 1){
			x_index_Time = new Date(curveBeginTime);
			x_index_Time.setDate(curveBeginTime.getDate()+x_value);
		    time = x_index_Time.getDate();
		} else if(data_unit === 2){
			x_index_Time = new Date(curveBeginTime);
			x_index_Time.setMonth(curveBeginTime.getMonth()+x_value);
			time = x_index_Time.getMonth()+1;
		}
		create_label(x,y,time,x_label_sty);
	}
}

/**
 * ����y���ǩ
 */
function create_y_label(){
	var x=y_label_left_blank;
	for(var i=0;i<=y_steps;i++){
		var count = 1;
		for(var j=0;j<y_precision;j++){
			count = count * 10;
		}
		var y_value=Math.round((y_min+i*y_value_per_step)*count)/count;
		var y=get_y_pels(y_value)+5;
		create_label(x,y,y_value,y_label_sty);
	}
	if(y_max_iscalc == 0) {
		var y_value=y_max;
		var y=get_y_pels(y_value)+5;
		create_label(x,y,y_value,y_label_sty);
	}
}

/**
 * ����y�ᵥλ��ʾ
 */
function create_y_union(){
	var x=y_label_left_blank/2;
	var y=y_axis_y2-30;
	create_label(x,y,y_union,union_sty);
}

/**
 * ����x�ᵥλ��ʾ
 */
function create_x_union(){
	var x=x_axis_x2+10;
	var x_axis_obj=svg_doc.getElementById("x_axis");
	var y=x_axis_obj.getAttribute("y2")-10;
	create_label(x,y,x_union,union_sty);
}

/**
 * ����
 */
function create_curve_title(){
	//�����ⲿ·��
	var outer_path=svg_doc.createElement("path");
	var x1=curve_width/3;
	var y1=line_top_blank/2;
	var x2=x1*2;
	var y2=y1;
	var trace="M "+x1+" "+y1+" l"+" "+x2+" "+y2;
	outer_path.setAttribute("d",trace);
	//��������·��
	var text_path=svg_doc.createElement("textPath");
	text_path.setAttribute("xlink:href",outer_path);
	text_path.setAttribute("x",x1);
	text_path.setAttribute("y",y1);
	//�����ı�����
	var text_node=svg_doc.createElement("text");
	text_node.setAttribute("style",title_sty);
	
	var text=svg_doc.createTextNode(curve_title);
	text_path.appendChild(text);
	text_node.appendChild(text_path);
	
	curve_group.appendChild(text_node);
}

/*
 *������������
 */
function parse_line_value(curve_obj,line_value){
	var x_values1=new Array();
	var y_values1=new Array();
	for(var i=0;i<line_value.length;i++){
		x_values1[i]=i;
		if(line_value[i]!=null&&(!isNaN(line_value[i]))){
			y_values1[i]=parseFloat(line_value[i]);
		}else{
			y_values1[i]=null;
		}
	}
	curve_obj.x_values=x_values1;
	curve_obj.y_values=y_values1;
}

/**
 * �ο��߸�ֵ
 */
function set_value(curve_obj,value){
	var x_values1=new Array();
	var y_values1=new Array();
	for(var i=0;i<288;i++){
		x_values1[i]=i;
		y_values1[i]=value;
	}
	curve_obj.x_values=x_values1;
	curve_obj.y_values=y_values1;
}

/**
 *�������ò���У�� 
 */
function param_verify(param){
	if(param==null){
		return -1;
	}
	if(isNaN(param)){
		return -1;
	}
	if(param.toString().length==0){
		return -1;
	}
	return 0;
}

function create_curve()
{
	//��ȡ����ֵ���������߶���
	var length = color_array.length;
	for(var i=0;i<curve_name_arr.length;i++){
		var line_name_value=curve_name_arr[i];
		var line_value_temp=curve_val_arr[i];
		if(line_value_temp){
			var line_value=line_value_temp.toString().split(",");;
			line_value.length = x_steps + 1; //��X�������ȡ����
			var curve_obj=new curve();
			curve_obj.line_group_id="line_group_1"+i;
			curve_obj.name=line_name_value;
			curve_obj.color=color_array[i%length];
			parse_line_value(curve_obj,line_value);
			add_curve(curve_obj);
		}
	}
	
	//��������
	for(var i=0;i<curve_arr.length;i++){
		var curve_obj=curve_arr[i];
		curve_obj.create_line(curve_obj.x_values,curve_obj.y_values,curve_obj.color,curve_obj.mask_flag,curve_obj.size,curve_obj.line_group_id,curve_obj.name,i);
	}
}

/**
 * ������ǩ,����
 */
function create_graph()
{
	create_grid();
	create_axis();
	create_curve_title();
	if(x_value_visible != 0)
		create_x_label();
	if(y_value_visible != 0)
		create_y_label();
	if(is_show_union == 1){
	    create_y_union();
	    create_x_union();
	}
	aim_x_axis();
	create_tipline();
	create_curve();
	create_tip_date();
}

/**
 * �����ǩ,����
 */
function remove_graph()
{
	curve_arr.length = 0;
	while (grid_group.firstChild != null) {
		grid_group.removeChild(grid_group.firstChild);
	}
	while (axis_group.firstChild != null) {
		axis_group.removeChild(axis_group.firstChild);
	}
	while (curve_group.firstChild != null) {
	    curve_group.removeChild(curve_group.firstChild);
	}
	while (text_group.firstChild != null) {
		text_group.removeChild(text_group.firstChild);
	}

}

/**
 * ����defs��ǩ����
 */
function create_defs()
{
	//�������˾�
	var defs = svg_doc.getElementById("defs0");
	var linearGradient=svg_doc.createElement("linearGradient");
	linearGradient.setAttribute("id","line_gradient");
	linearGradient.setAttribute("x1","0%");
	linearGradient.setAttribute("y1","100%");
	linearGradient.setAttribute("x2","0%");
	linearGradient.setAttribute("y2","0%");
	linearGradient.setAttribute("gradientUnits","userSpaceOnUse");
	var stop = null;
	stop=svg_doc.createElement("stop");
	stop.setAttribute("style",bg_start_style);
	stop.setAttribute("offset","0");
	linearGradient.appendChild(stop);
	stop=svg_doc.createElement("stop");
	stop.setAttribute("style",bg_end_style);
	stop.setAttribute("offset","1");
	linearGradient.appendChild(stop);
	defs.appendChild(linearGradient);
	//�������ͷ����
	var marker=svg_doc.createElement("marker");
	marker.setAttribute("id","end_arrow");
	marker.setAttribute("orient","auto");
	marker.setAttribute("refX","0.0");
	marker.setAttribute("refY","0.0");
	marker.setAttribute("style","overflow:visible;");
	var path=svg_doc.createElement("path");
	path.setAttribute("d","M 0.0,0.0 L 5.0,-5.0 L -12.5,0.0 L 5.0,5.0 L 0.0,0.0 z");
	path.setAttribute("style",marker_style);
	path.setAttribute("transform","scale(0.4) rotate(180) translate(10,0)");
	marker.appendChild(path);
	defs.appendChild(marker);
}

function init_data(){
	/**
	 *������ȡ��y���ǩ�����ޡ�x��λ��У׼
	 *����Ĳ����У�
	 *		 data_precision:��ֵ����
	 *		 up_limit����������ֵ
	 *		 down_limit����������ֵ
	 *		 standard_limit����׼����ֵ(��ƽ��ֵ)
	 *		 y_min��y����Сֵ
	 *		 y_max��y�����ֵ
	 *		 y_value_per_step��y���ǩ����
	 *���ϲ���Ϊ����ģ��ڻ�ȡ����������ֻҪ����һ���쳣��ֹͣ��������
	 */
	try{
		//��������������y�������Сֵ 
//		y_data_reset();
		//��ȡ���ò���
		var param_verify_func=param_verify;
		var param_arr=new Array();
		param_arr.push(data_precision);
		param_arr.push(y_min);
		param_arr.push(y_max);
		param_arr.push(y_value_per_step);
		//����У��
		var param_arr_len=param_arr.length;
		for(var i=0;i<param_arr_len;i++){
			if(param_verify_func(param_arr[i])==-1){
			 	create_label(320,200,"��������,���߻���ʧ��",err_msg_sty);
			 	return;
			}
		}
		data_precision=parseInt(data_precision);
		//ˢ������
		y_steps=Math.round((y_max-y_min)/y_value_per_step);					   //y���ǩ�ܲ���
		x_step_pels=(curve_width-line_left_blank-line_right_blank)/x_steps;    //x��ÿ��������
		y_step_pels=(curve_height-line_top_blank-line_bottom_blank)/y_steps;   //y��ÿ��������
		return true;
	}catch(ex){
		return false;
	}
}

//=================================�������=======================================
/**
 * ���ߺ�������ȡҳ������
 */
function get_param_for_curve(param_name){
  	var temp_obj=document.getElementById(param_name);
  	if(temp_obj==null){
  		return null;
  	}else{
  		return temp_obj.value;
  	}
}
/**
 * ������
 */
function main(evt){
	/**
	 *��ͼ����ʼ��
	 *��ɱ�����������ĳ�ʼλ�û���
	 *�ò���������ִ�� 
	 */
	//������ʼ��
	svg_doc=evt.target.ownerDocument;
	bg_group=svg_doc.getElementById("bg_group");
	grid_group=svg_doc.getElementById("grid_group");
	curve_group=svg_doc.getElementById("curve_group");
	text_group=svg_doc.getElementById("text_group");
	axis_group=svg_doc.getElementById("axis_group");

	create_defs();
	create_background();
	refreshcurve(curve_param, 0);
}

function getRealTimeData()
{
	var url = "";
	if(data_bean != "")
		url = "getRealTimeData.jsp?data_bean="+data_bean+"&"+curve_param;
	else
		url = "getRealTimeData.jsp?data_source="+data_source+"&data_sql="+data_sql+"&data_name="+data_name+"&data_time="+data_time+"&data_value="+data_value+"&data_source_style="+data_source_style+"&data_interval="+data_interval+"&data_unit="+data_unit+"&"+curve_param;
	var isSync = true;
	try 
	{
  		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	} 
	catch (e) 
	{
  		try 
  		{
    		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  		} 
  		catch (ex) 
  		{
    		xmlHttp = null;
  		}
	}
	
	if ((xmlHttp == null) && (typeof XMLHttpRequest != 'undefined')) 
	{
  		xmlHttp = new XMLHttpRequest();
	}
    
    if(xmlHttp != null)
    {
        xmlHttp.open("POST", url, isSync);
    	xmlHttp.onreadystatechange = loadRealTimeData;
        try
        {
        	xmlHttp.send(null);
		}
		catch(e)
		{
			alert("������������ݽ�������,�����Ƿ�������ȷ���ݽ����ӿ����ƣ�");
		}
    }
    else
    {
    	alert("����������汾̫��,��������IE6.0�����ϰ汾��");
    }
}

function loadRealTimeData(data) 
{
	if (xmlHttp.readyState == 4) 
    {	//δ��ȡ������
		if (xmlHttp.status == 404 ||xmlHttp.status == 400)
		{
			alert("�޷������趨�����ݽ��սӿ����ȡ���ݣ�");
			return;
		}
        
        //��ȡ������
        if (xmlHttp.status == 200) 
        {
			var responseXML = xmlHttp.responseXML;
			var curveList = responseXML.getElementsByTagName("curve");
			/**
			 * ��ʼ������
			 */
			label_arr = new Array();
			curve_val_arr = new Array();
			curve_name_arr = new Array();
			curve_begin_time_arr = new Array();
			curve_end_time_arr = new Array();
			if(curveList.length > 0){
				var y_first = parseFloat(curveList.item(0).getAttribute("curvevalue").split(",")[0]);
				y_max = y_first;y_min = y_first;
				y_rea_max =y_first;y_rea_min = y_first;
			}
			if($("#inforTable").length > 0)
				$("#inforTable").remove();
			var $inforTable = $("<table style='border-collapse: collapse;border: 1px solid #cccccc;background-color: White;table-layout:fixed;margin-left: 0px;width:"+(curve_width - 2 * $('embed')[0].offsetLeft)+"px' id='inforTable'></table>");
			for (var i = 0; i < curveList.length; i++) {
				var curveElement = curveList.item(i);
				var curveName = curveElement.getAttribute("curvename");
				var curveValue = curveElement.getAttribute("curvevalue");
				if(is_dynamic == 1){
				    curve_title = curveElement.getAttribute("curvetitle");
				}
				getYMaxYMin(curveValue);
				maxY1 = getMaxY(curveValue);
				minY1 = getMinY(curveValue);
				if(maxminbetween_visible == 1){
					var maxY1 = getMaxY(curveValue);
					var minY1 = getMinY(curveValue);
					var betweenY = Math.round((maxY1 - minY1)*100)/100;
				    var $inforTr = $("<tr style='color:"+color_array[i]+"'></tr>");
				    var $nameTd = $("<td style='border-left: 1.0pt solid windowtext;border-right: 1.0pt solid windowtext;border-bottom: 1.0pt solid windowtext;border-color: #cccccc;height:25px;padding: 1px 2px 1px 4px;font-weight:bold'></td>");
				    $nameTd.text(curveName.split(" ")[0] +"��");
				    var $maxTd = $("<td style='border-left: 1.0pt solid windowtext;border-right: 1.0pt solid windowtext;border-bottom: 1.0pt solid windowtext;border-color: #cccccc;height:25px;padding: 1px 2px 1px 4px;font-weight:bold'></td>");
				    $maxTd.text("���ֵ��" + maxY1);
				    var $minTd = $("<td style='border-left: 1.0pt solid windowtext;border-right: 1.0pt solid windowtext;border-bottom: 1.0pt solid windowtext;border-color: #cccccc;height:25px;padding: 1px 2px 1px 4px;font-weight:bold'></td>");
				    $minTd.text("��Сֵ��" + minY1);
				    var $betweenTd = $("<td style='border-left: 1.0pt solid windowtext;border-right: 1.0pt solid windowtext;border-bottom: 1.0pt solid windowtext;border-color: #cccccc;height:25px;padding: 1px 2px 1px 4px;font-weight:bold'></td>");
				    $betweenTd.text("��Ȳ" + betweenY);
				    $inforTr.append($nameTd).append($maxTd).append($minTd).append($betweenTd);
				    $inforTable.append($inforTr);
				}
				curveBeginTime = new Date(parseFloat(curveElement.getAttribute("curvebegintime")));
				var curveEndTime = new Date(parseFloat(curveElement.getAttribute("curveendtime")));
				curve_name_arr[i] = curveName;
				curve_val_arr[i] = curveValue;
				curve_begin_time_arr[i] = curveBeginTime;
				reset_x_param();
				curve_end_time_arr[i] = curveEndTime;
				if(curve_arr.length != 0)
					remove_graph();
				if(init_data())
					create_graph();
				if(maxminaver_showline_visible == 1){
					var averageY1 = getAverage(curveValue);
					var style="fill:"+color_array[i]+";stroke:"+color_array[i]+";font-size:13;";
					label_arr.push(create_label_nogroup((x_axis_x2 - x_axis_x1)/3 + x_axis_x1,(y_axis_y2 - y_axis_y1) * (0.5 + 0.5 * (curveList.length - i)) / 10 + y_axis_y1,"���ֵ��" + maxY1,style));
					label_arr.push(create_label_nogroup((x_axis_x2 - x_axis_x1)*13.5/24 + x_axis_x1,(y_axis_y2 - y_axis_y1) * (0.5 + 0.5 * (curveList.length - i)) / 10 + y_axis_y1,"��Сֵ��" + minY1,style));
					label_arr.push(create_label_nogroup((x_axis_x2 - x_axis_x1)*19/24 + x_axis_x1,(y_axis_y2 - y_axis_y1) * (0.5 + 0.5 * (curveList.length - i)) / 10 + y_axis_y1,"ƽ��ֵ��" + averageY1,style));
				}
			}
			if(maxminaver_showline_visible == 1){
            	for(var j=0;j<label_arr.length;j++){
            		curve_group.appendChild(label_arr[j]);
            	}
			}
			if(maxminbetween_visible == 1)
			    $("body").append($inforTable);
         }
    }
}
function getMaxY(val){
	var y_max1 = parseFloat(val.split(",")[0]);
	var curve_val_arr = val.split(",");
	for(var i = 0; i < curve_val_arr.length; i++)
	{
		 if(parseFloat(curve_val_arr[i]) > y_max1)
			 y_max1 = parseFloat(curve_val_arr[i]);
	}
	return Math.round(y_max1*100)/100;
}

function getMinY(val){
	var y_min1 = parseFloat(val.split(",")[0]);
	var curve_val_arr = val.split(",");
	for(var i = 0; i < curve_val_arr.length; i++)
	{
		 if(parseFloat(curve_val_arr[i]) < y_min1)
			 y_min1 = parseFloat(curve_val_arr[i]);
	}
	return Math.round(y_min1*100)/100;
}

function getAverage(val){
	var curve_val_arr = val.split(",");
	var total = 0;
	for(var i = 0; i < curve_val_arr.length; i++){
		total = total + parseFloat(curve_val_arr[i]);
	}
	return Math.round(total / curve_val_arr.length *100)/100;
}

function refreshcurve(param, action)
{
	if(action == 0)
		curve_param = param;
	else if(action == 1) {
		var newparam = "";
		var arr1 = curve_param.split("&");
		for(var i = 0; i < arr1.length; i++) {
			var arr2 = arr1[i].split("=");
			var paramname = arr2[0];
			var paramvalue = arr2[1];
			var arr3 = param.split("&");
			for(var j = 0; j < arr3.length; j++) {
				var arr4 = arr3[j].split("=");
				if(arr4[0] == paramname) {
					paramvalue = paramvalue + "," + arr4[1];
					break;
				}
			}
			newparam = newparam+paramname+"="+paramvalue+"&";
		}
		curve_param = newparam.substring(0,newparam.length-1);
	}
	getRealTimeData();
	if(refresh_interval != 0)
		setInterval("getRealTimeData()",refresh_interval*1000);
}
/**
 * ��ȡ����ֵ�Լ�����ֵ
 * @param  curveValue
 * */	
function getYMaxYMin(curveValue){
	var resultArray = curveValue.split(",");
	if(y_rea_max < parseFloat(resultArray[0]))
		y_rea_max = parseFloat(resultArray[0]);
	if(y_rea_min > parseFloat(resultArray[0]))
		y_rea_min = parseFloat(resultArray[0]);
	for(var i = 1, j =resultArray.length;i < j ;i++){
		if(y_rea_max < parseFloat(resultArray[i])){
			y_rea_max = parseFloat(resultArray[i]);
		}
		if(y_rea_min > parseFloat(resultArray[i])){
			y_rea_min = parseFloat(resultArray[i]);
		}
	}
	//��y������ֵ����ֵ����
	if(y_rea_max < 0){
		y_max = y_rea_max * (1-up_overflow );
		y_min = y_rea_min * (1+down_overflow);
	} else if (y_rea_min > 0){
		y_max = y_rea_max * (1+up_overflow );
		y_min = y_rea_min * (1-down_overflow);
	} else {
		y_max = y_rea_max * (1+up_overflow );
		y_min = y_rea_min * (1+down_overflow);
	}
//	y_max = y_rea_max + y_rea_max - y_rea_min;
//	y_min = y_rea_min + y_rea_min - y_rea_max;
	if(y_min_iscalc === 0){
		y_min = y_min_value;
	}
	if(y_max_value === 0){
	    y_max = y_max_value;
	}
	//����y���ǩ��ֵ���
	y_value_per_step = eval("("+y_value_per_step_formulas.replace("y_max",y_max).replace("y_min",y_min).replace("y_value_per_step_number",y_value_per_step_number)+")");
}