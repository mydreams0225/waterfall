(function(){
	var oli=document.getElementsByClassName('box');
	var page=1;
	 var flag = false;
	var  initWidth = 200;
	getData();
	function getData(){
		if(!flag){
			flag=true;
			ajax("GET","http://localhost:8081/web/ajax/waterfallZ/src/js/getPics.php",addDom,"cpage="+page,true)
	        page++;
		}
       

	}
	function addDom(data){
        var datalist=JSON.parse(data);
         if(datalist.length > 0) {
        datalist.forEach(function(ele,index){
          var minIndex=  getMinList(oli);
        	var oItem=document.createElement("div"),
        	    oimg=new Image(),
        	    oimgBox=document.createElement("div"),
        	    op=document.createElement("p");
        	    oItem.className="item";
        	    oimgBox.className="imgBox";
        	    oimg.src=ele.preview;
        	    oimg.height=ele.height* initWidth/ele.width;
        	    
        	    oimgBox.style.height=ele.height * initWidth /ele.width;
        	    //oimg.width="200px";
        	    op.innerText=ele.title;
        	    oimg.onload=function(){
                        this.style.width = '202px';
                        oimg.height = ele.height * initWidth/ele.width + 2;
                        this.style.margin = '-1px';

        	    }
        	    oimgBox.appendChild(oimg);
        	    oItem.appendChild(oimgBox);
        	    oItem.appendChild(op);
                oli[minIndex].appendChild(oItem);

        })
        }
            flag=false;

	}
    

	function getMinList(dom){
       var minHeight=dom[0].offsetHeight;
        var i=1
       var index=0;
       for(;i<dom.length;i++){
       	 var height=dom[i].offsetHeight;
       	 if(minHeight>height){
       	 	minHeight=height;
       	 	index=i;
       	 }
       	 

       } 
       console.log(index);
       	 return index;
	}

	window.onscroll=function(){
		 var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var pageHeigh = oli[getMinList(oli)].offsetHeight;

        if(scrollHeight + clientHeight > pageHeigh) {
            getData();
        }
	}

})()