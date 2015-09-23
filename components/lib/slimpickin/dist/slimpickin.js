//---------------------------------------------------SLIMPICKIN----------------------------------------------
//											 DOM Element Selection Tool
//											 Written By : Brian Brennan
//													MIT  License
//
(function(){

	var s = function(selector, pos){
		return new Slimpickin(selector, pos);
	};

	var Slimpickin = function(selector, pos){//selector is what Slimpickin will pick

		if(typeof pos === 'undefined'){
			if(typeof selector === 'object')
				selector = Slimpickin.fullPath(selector);

			this.l = document.querySelectorAll(selector);//l is short for element, what will be returned to s;
			this.selector = selector;
		} else {
			this.l = [document.querySelectorAll(selector)[pos]];
		}

	};

	Slimpickin.ready = function(cb){
		document.addEventListener('DOMContentLoaded',cb);

		return this;
	};

	Slimpickin.fullPath = function(el){
		var names = [];
		while (el.parentNode){
			if (el.id){
				names.unshift('#'+el.id);
				break;
			}else{
				if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
				else{
					for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
						names.unshift(el.tagName+":nth-child("+c+")");
				}
				el=el.parentNode;
			}
		}
		return names.join(" > ");
	}

	s.fn = Slimpickin.prototype = { //functions for the Slimpickin Class
		innerHtml: function(ih){//innerHtml() function
			if(typeof ih !== 'undefined'){//sets the innerHtml, returns this;
				for(var i = 0; i < this.l.length; i++)
					this.l[i].innerHTML = ih;
				return this;
			} else {//gets the innerHtml, returns the innerHtml;
				var iha = [];
				for(var i = 0; i < this.l.length; i++)
					iha[i] = this.l[i].innerHTML;
				return iha;
			}
		},
		outerHtml:  function(oh){
			if(typeof oh !== "undefined"){
				for(var i = 0; i < this.l.length; i++){
					this.l[i].outerHTML = oh;
				}
				return this;
			} else {
				var oha = [];
				for(var i = 0; i < this.l.length; i++){
					oha[i] = this.l[i].outerHTML;
				}
				return oha;
			}
		},
		css: function(st, stv){
			if(typeof stv !== "undefined"){

				for(var i = 0; i < this.l.length; i++){
					this.l[i].style[st] = stv;
				}

				return this;
			} else {

				var sta = [];

				for(var i = 0; i < this.l.length; i++){
					var element = document.querySelectorAll(this.selector)[i];
					sta[i] = window.getComputedStyle(element)[st];
				}

				return sta;

			}
		},
		attr: function(at, atv){ //changes attribute property of at to atv
			if(typeof atv !== "undefined"){

				for(var i = 0; i < this.l.length; i++){
					this.l[i].setAttribute(at,atv);
				}

				return this;

			} else {

				var atta = [];
				for(var i = 0; i < this.l.length; i++)
					atta[i] = this.l[i].getAttribute(at);
				return atta;
			}
		},
		class: function(cl){
			if(typeof cl !== "undefined"){
				for(var i = 0; i < this.l.length; i++){
					this.l[i].setAttribute('class',cl);
				}
				return this;
			} else{

				var res = [];
				for(var i = 0; i < this.l.length; i++){
					res[i] = this.l[i].getAttribute('class');
				}

				return res;
			}
		},
		_id: function(id){
			if(typeof id !== "undefined"){
				for(var i = 0; i < this.l.length; i++){
					this.l[i].setAttribute('id',id);
				}
				return this;
			} else{
				var res = [];
				for(var i = 0; i < this.l.length; i++){
					res[i] = this.l[i].getAttribute('id');
				}

				return res;
			}
		},
		addClass: function(cl){
			for(var i = 0; i < this.l.length; i++){
				var cla = this.l[i].getAttribute("class");
				if(cla){
					this.l[i].setAttribute("class", cla + " " + cl);
				} else{
					this.l[i].setAttribute("class", cl);
				}
			}

			return this;
		},
		addId: function(id){
			for(var i = 0; i < this.l.length; i++){
				var ida = this.l[i].getAttribute("id");
				if(ida){
					this.l[i].setAttribute("id", ida + " " + id);
				} else{
					this.l[i].setAttribute("id", id);
				}
			}

			return this;
		},
		removeClass: function(cl){
			if(typeof cl !== 'undefined'){
				for(var i = 0; i < this.l.length; i++){
					if(this.l[i].getAttribute("class"))
						this.l[i].setAttribute("class",this.l[i].getAttribute("class").replace(cl, ""));
				}
			} else{
				for(var i = 0; i < this.l.length; i++){
					this.l[i].setAttribute("class","");
				}			
			}

			return this;
		},
		removeId: function(id){
			if(typeof id !== 'undefined'){
				for(var i = 0; i < this.l.length; i++){
					if(this.l[i].getAttribute("id"))
						this.l[i].setAttribute("id",this.l[i].getAttribute("id").replace(id, ""));
				}

			} else{
				for(var i = 0; i < this.l.length; i++){
					this.l[i].setAttribute("id","");
				}		
			}

			return this;
		},
		hasClass: function(cl){
			var res = [];

			for(var i = 0; i < this.l.length; i++){

				var ans = " " + this.l[i].getAttribute("class") + " ";

				res[i] = ans.indexOf(" " + cl + " ") > -1;
			}

			return res; 
		},
		hasId: function(id){ // returns boolean of if the selected element contains the given id

			var res = [];

			for(var i = 0; i < this.l.length; i++){

				var ans = " " + this.l[i].getAttribute("id") + " ";

				res[i] = ans.indexOf(" " + id + " ") > -1;
			}

			return res;
		},		
		at: function(pos){
			return new Slimpickin(this.selector, pos);
		},
		first: function(){
			return new Slimpickin(this.selector, 0);
		},
		last: function(){
			return new Slimpickin(this.selector, this.l.length - 1);
		},
		each: function(cb){
			for(var i = 0; i < this.l.length; i++){
				cb();
			}

			return this;
		},
		insert: function(ins){
			for(var i = 0; i < this.l.length; i++){
				this.l[i].innerHTML = this.l[i].innerHTML + ins;
			}

			return this;
		},
		presert: function(pre){
			for(var i = 0; i < this.l.length; i++){
				this.l[i].innerHTML = pre + this.l[i].innerHTML;
			}

			return this;
		},
		append: function(ap){
			for(var i = 0; i < this.l.length; i++){
				this.l[i].outerHTML = this.l[i].outerHTML + ap;
			}
			return this;
		},
		prepend: function(pre){
			for(var i = 0; i < this.l.length; i++)
				this.l[i].outerHTML = pre + this.l[i].outerHTML;
			return this;
		},
		wrap: function(pre, ap){
			for(var i = 0; i < this.l.length; i++)
				this.l[i].outerHTML = pre + this.l[i].outerHTML + ap;
			return this;
		},
		on: function(ev, cb){
			for(var i = 0; i < this.l.length; i++){
				this.l[i].addEventListener(ev, cb);
			}
			return this;
		},
		click: function(cb){
			for(var i = 0; i < this.l.length; i++){
				this.l[i].addEventListener('click', cb);
			}
			return this;
		},
		hover: function(cb, cb2){
			for(var i = 0; i < this.l.length; i++){
				this.l[i].addEventListener('mouseover', cb);
				if(typeof cb2 !== 'undefined')
					this.l[i].addEventListener('mouseout',cb2);
			}
			return this;
		}

	};

	if(!window.s){
		window.s = s;
	}

	if(!window.S){
		window.S = window.Slimpickin = Slimpickin;
	}

}());													
