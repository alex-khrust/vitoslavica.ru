$(".filter-item .item").on("click",function(){if(($(this).parent().find(".filter-name").text()=="Инженерия")||($(this).parent().find(".filter-name").text()=="Отделка")){if($(this).text()!="Нет"){$(this).parent().find(".active:contains('Нет')").removeClass("active")}else{$(this).parent().find(".active").removeClass("active")}}else{$(this).parent().find(".active").removeClass("active")}$(this).toggleClass("active")});$(".calculator-house form .btn").on("click",function(k){k.preventDefault();$(".calculator-house .warning").remove();var p="";$(".calculator-house .filter-item").each(function(){if($(this).find(".item.active").length==0){if(p>""){p+=", "}p+=$(this).find(".filter-name").text()}});if(p>""){$(".calculator-house form").append('<div class="warning">Выберите: '+p+".</div>");return false}var n=$(".calculator-house .filter-item.square .item.active").index()-1;var a=$(".calculator-house .filter-item.square .item.active").text();var g=$(".calculator-house .filter-item.floor .item.active").text();var b=$(".calculator-house .filter-item.base .item.active").text();var r=$(".calculator-house .filter-item.wall .item.active").text();var f=$(".calculator-house .filter-item.roof .item.active").text();eng=[];var j="";$(".calculator-house .filter-item.engineering .item.active").each(function(){if(j>""){j+=", "}j+=$(this).text();eng.push($(this).text())});finmas=[];var q="";$(".calculator-house .filter-item.finish .item.active").each(function(){if(q>""){q+=", "}q+=$(this).text();finmas.push($(this).text())});$(".calculator-result .rspace").text(a);$(".calculator-result .rfloors").text(g);$(".calculator-result .rbase").text(b);$(".calculator-result .rwall").text(r);$(".calculator-result .rroof").text(f);$(".calculator-result .rengineering").text(j);$(".calculator-result .rfinish").text(q);var i=0;var c=$("#calcuref table tr td:contains('"+b+"')").eq(n).text();c=c.replace(/.+\s-\s/,"")*1;i+=c;c=0;var c=$("#calcuref table tr td:contains('"+r+"')").eq(n).text();if(!c&&r=="Профилированный брус"){c=$("#calcuref table tr td:contains('Проф брус')").eq(n).text()}if(!c&&r=="Оцилиндрованное бревно"){c=$("#calcuref table tr td:contains('ОЦБ')").eq(n).text()}if(!c&&r=="Рубленное бревно"){c=$("#calcuref table tr td:contains('РБ')").eq(n).text()}c=c.replace(/.+\s-\s/,"")*1;i+=c;c=0;var c=$("#calcuref table tr td:contains('"+f+"')").eq(n).text();if(!c&&f=="Рубероид"){c=$("#calcuref table tr td:contains('Руберойд')").eq(n).text()}if(!c&&f=="Металлочерепица"){c=$("#calcuref table tr td:contains('Мет чер')").eq(n).text()}if(!c&&f=="Мягкая черепица"){c=$("#calcuref table tr td:contains('Мяг чер')").eq(n).text()}if(!c&&f=="Натуральная черепица"){c=$("#calcuref table tr td:contains('Натуральная')").eq(n).text()}c=c.replace(/.+\s-\s/,"")*1;i+=c;c=0;eng.forEach(function(t,d,e){var s=$("#calcuref table tr td:contains('"+t+"')").eq(n).text();s=s.replace(/.+\s-\s/,"")*1;i+=s;s=0});finmas.forEach(function(d,e,s){var t=$("#calcuref table tr td:contains('"+d+"')").eq(n).text();t=t.replace(/.+\s-\s/,"")*1;i+=t;t=0});$(".calculator-result .price").text(i.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1 "));$(".calculator-result.hidden").toggleClass("hidden");var h="";$(".calculator-result p").each(function(){if(h>""){h+="\n"}h+=$(this).text()});$("#corder").html(h);var m="";var l=location.href.split("#")[0].split("?");var b=l[0];var o=l[1];$.get("/doit.html?selectSquare="+a+"&priceSum="+i+"&level="+g+"&wall="+r,function(d){if(d){$(".notification-data").text("");if(a=="70-120"){if(r=="Оцилиндрованное бревно"){$(".notification-data").text("* Данные проекты можно реализовать в оцилиндрованном бревне")}if(r=="Рубленное бревно"){$(".notification-data").text("* Данные проекты можно реализовать в рубленном бревне")}if(r=="Рубленное бревно"){$(".notification-data").text("* Данные проекты можно реализовать в рубленном бревне")}$(".notification-data").text("")}else{if(r=="Клееный брус"){$(".notification-data").text("* Данные проекты можно реализовать в клееном брусе")}}$(".vivod-project").html(d);ErrorDate()}else{}})});function ErrorDate(){if($("*").is(".error-data")){if($("#owl-car-recent li").size()==0){$(".error-data").text("На данный момент проекта по выбранным параметрам нет. Попробуйте изменить параметры.")}else{$(".error-data").text("")}}};