/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-typescript version: 3.7.0(887411e17c69d048791cdbb2763496bd6bcd133a)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-typescript/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t
e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},__generator=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.")
for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return a.label++,{value:i[1],done:!1}
case 5:a.label++,r=i[1],i=[0]
continue
case 7:i=a.ops.pop(),a.trys.pop()
continue
default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1]
break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i
break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i)
break}o[2]&&a.ops.pop(),a.trys.pop()
continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}
define("vs/language/typescript/workerManager",["require","exports"],(function(e,t){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var n=function(){function e(e,t){var n=this
this._modeId=e,this._defaults=t,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((function(){return n._stopWorker()})),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((function(){return n._updateExtraLibs()}))}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()},e.prototype._updateExtraLibs=function(){return __awaiter(this,void 0,void 0,(function(){var e,t
return __generator(this,(function(n){switch(n.label){case 0:return this._worker?(e=++this._updateExtraLibsToken,[4,this._worker.getProxy()]):[2]
case 1:return t=n.sent(),this._updateExtraLibsToken!==e||t.updateExtraLibs(this._defaults.getExtraLibs()),[2]}}))}))},e.prototype._getClient=function(){var e=this
if(!this._client){this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs()}})
var t=this._worker.getProxy()
this._defaults.getEagerModelSync()&&(t=t.then((function(t){return e._worker?e._worker.withSyncedResources(monaco.editor.getModels().filter((function(t){return t.getModeId()===e._modeId})).map((function(e){return e.uri}))):t}))),this._client=t}return this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,t=this,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r]
return this._getClient().then((function(t){e=t})).then((function(e){if(t._worker)return t._worker.withSyncedResources(n)})).then((function(t){return e}))},e}()
t.WorkerManager=n}))
var __extends=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)}
return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}()
__awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t
e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},__generator=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.")
for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return a.label++,{value:i[1],done:!1}
case 5:a.label++,r=i[1],i=[0]
continue
case 7:i=a.ops.pop(),a.trys.pop()
continue
default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1]
break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i
break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i)
break}o[2]&&a.ops.pop(),a.trys.pop()
continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},define("vs/language/typescript/languageFeatures",["require","exports"],(function(e,t){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var n,r=monaco.Uri,o=monaco.Range
function i(e,t,n){if(void 0===n&&(n=0),"string"==typeof e)return e
if(void 0===e)return""
var r=""
if(n){r+=t
for(var o=0;o<n;o++)r+="  "}if(r+=e.messageText,n++,e.next)for(var a=0,s=e.next;a<s.length;a++)r+=i(s[a],t,n)
return r}function a(e){return e?e.map((function(e){return e.text})).join(""):""}!function(e){e[e.None=0]="None",e[e.Block=1]="Block",e[e.Smart=2]="Smart"}(n||(n={})),t.flattenDiagnosticMessageText=i
var s,u=function(){function e(e){this._worker=e}return e.prototype._textSpanToRange=function(e,t){var n=e.getPositionAt(t.start),r=e.getPositionAt(t.start+t.length)
return{startLineNumber:n.lineNumber,startColumn:n.column,endLineNumber:r.lineNumber,endColumn:r.column}},e}()
t.Adapter=u,function(e){e[e.Warning=0]="Warning",e[e.Error=1]="Error",e[e.Suggestion=2]="Suggestion",e[e.Message=3]="Message"}(s||(s={}))
var c=function(e){function t(t,n,r){var o=e.call(this,r)||this
o._defaults=t,o._selector=n,o._disposables=[],o._listener=Object.create(null)
var i=function(e){if(e.getModeId()===n){var t,r=e.onDidChangeContent((function(){clearTimeout(t),t=setTimeout((function(){return o._doValidate(e)}),500)}))
o._listener[e.uri.toString()]={dispose:function(){r.dispose(),clearTimeout(t)}},o._doValidate(e)}},a=function(e){monaco.editor.setModelMarkers(e,o._selector,[])
var t=e.uri.toString()
o._listener[t]&&(o._listener[t].dispose(),delete o._listener[t])}
o._disposables.push(monaco.editor.onDidCreateModel(i)),o._disposables.push(monaco.editor.onWillDisposeModel(a)),o._disposables.push(monaco.editor.onDidChangeModelLanguage((function(e){a(e.model),i(e.model)}))),o._disposables.push({dispose:function(){for(var e=0,t=monaco.editor.getModels();e<t.length;e++){var n=t[e]
a(n)}}})
var s=function(){for(var e=0,t=monaco.editor.getModels();e<t.length;e++){var n=t[e]
a(n),i(n)}}
return o._disposables.push(o._defaults.onDidChange(s)),o._disposables.push(o._defaults.onDidExtraLibsChange(s)),monaco.editor.getModels().forEach(i),o}return __extends(t,e),t.prototype.dispose=function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables=[]},t.prototype._doValidate=function(e){return __awaiter(this,void 0,void 0,(function(){var t,n,r,o,i,a,s,u,c=this
return __generator(this,(function(l){switch(l.label){case 0:return[4,this._worker(e.uri)]
case 1:return t=l.sent(),e.isDisposed()?[2]:(n=[],r=this._defaults.getDiagnosticsOptions(),o=r.noSyntaxValidation,i=r.noSemanticValidation,a=r.noSuggestionDiagnostics,o||n.push(t.getSyntacticDiagnostics(e.uri.toString())),i||n.push(t.getSemanticDiagnostics(e.uri.toString())),a||n.push(t.getSuggestionDiagnostics(e.uri.toString())),[4,Promise.all(n)])
case 2:return!(s=l.sent())||e.isDisposed()||(u=s.reduce((function(e,t){return t.concat(e)}),[]).filter((function(e){return-1===(c._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code)})).map((function(t){return c._convertDiagnostics(e,t)})),monaco.editor.setModelMarkers(e,this._selector,u)),[2]}}))}))},t.prototype._convertDiagnostics=function(e,t){var n=t.start||0,r=t.length||1,o=e.getPositionAt(n),a=o.lineNumber,s=o.column,u=e.getPositionAt(n+r),c=u.lineNumber,l=u.column
return{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:a,startColumn:s,endLineNumber:c,endColumn:l,message:i(t.messageText,"\n"),code:t.code.toString(),tags:t.reportsUnnecessary?[monaco.MarkerTag.Unnecessary]:[],relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}},t.prototype._convertRelatedInformation=function(e,t){if(t){var n=[]
return t.forEach((function(t){var r=e
if(t.file){var o=monaco.Uri.parse(t.file.fileName)
r=monaco.editor.getModel(o)}if(r){var a=t.start||0,s=t.length||1,u=r.getPositionAt(a),c=u.lineNumber,l=u.column,p=r.getPositionAt(a+s),g=p.lineNumber,d=p.column
n.push({resource:r.uri,startLineNumber:c,startColumn:l,endLineNumber:g,endColumn:d,message:i(t.messageText,"\n")})}})),n}},t.prototype._tsDiagnosticCategoryToMarkerSeverity=function(e){switch(e){case s.Error:return monaco.MarkerSeverity.Error
case s.Message:return monaco.MarkerSeverity.Info
case s.Warning:return monaco.MarkerSeverity.Warning
case s.Suggestion:return monaco.MarkerSeverity.Hint}return monaco.MarkerSeverity.Info},t}(u)
t.DiagnosticsAdapter=c
var l=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),Object.defineProperty(t.prototype,"triggerCharacters",{get:function(){return["."]},enumerable:!0,configurable:!0}),t.prototype.provideCompletionItems=function(e,n,r,i){return __awaiter(this,void 0,void 0,(function(){var r,i,a,s,u
return __generator(this,(function(c){switch(c.label){case 0:return r=e.getWordUntilPosition(n),i=new o(n.lineNumber,r.startColumn,n.lineNumber,r.endColumn),a=e.uri,s=e.getOffsetAt(n),[4,this._worker(a)]
case 1:return[4,c.sent().getCompletionsAtPosition(a.toString(),s)]
case 2:return!(u=c.sent())||e.isDisposed()?[2]:[2,{suggestions:u.entries.map((function(r){var s=i
if(r.replacementSpan){var u=e.getPositionAt(r.replacementSpan.start),c=e.getPositionAt(r.replacementSpan.start+r.replacementSpan.length)
s=new o(u.lineNumber,u.column,c.lineNumber,c.column)}return{uri:a,position:n,range:s,label:r.name,insertText:r.name,sortText:r.sortText,kind:t.convertKind(r.kind)}}))}]}}))}))},t.prototype.resolveCompletionItem=function(e,n,r,o){return __awaiter(this,void 0,void 0,(function(){var n,o,i,s,u
return __generator(this,(function(c){switch(c.label){case 0:return o=(n=r).uri,i=n.position,s=e.getOffsetAt(i),[4,this._worker(o)]
case 1:return[4,c.sent().getCompletionEntryDetails(o.toString(),s,n.label)]
case 2:return!(u=c.sent())||e.isDisposed()?[2,n]:[2,{uri:o,position:i,label:u.name,kind:t.convertKind(u.kind),detail:a(u.displayParts),documentation:{value:a(u.documentation)}}]}}))}))},t.convertKind=function(e){switch(e){case _.primitiveType:case _.keyword:return monaco.languages.CompletionItemKind.Keyword
case _.variable:case _.localVariable:return monaco.languages.CompletionItemKind.Variable
case _.memberVariable:case _.memberGetAccessor:case _.memberSetAccessor:return monaco.languages.CompletionItemKind.Field
case _.function:case _.memberFunction:case _.constructSignature:case _.callSignature:case _.indexSignature:return monaco.languages.CompletionItemKind.Function
case _.enum:return monaco.languages.CompletionItemKind.Enum
case _.module:return monaco.languages.CompletionItemKind.Module
case _.class:return monaco.languages.CompletionItemKind.Class
case _.interface:return monaco.languages.CompletionItemKind.Interface
case _.warning:return monaco.languages.CompletionItemKind.File}return monaco.languages.CompletionItemKind.Property},t}(u)
t.SuggestAdapter=l
var p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this
return t.signatureHelpTriggerCharacters=["(",","],t}return __extends(t,e),t.prototype.provideSignatureHelp=function(e,t,n){return __awaiter(this,void 0,void 0,(function(){var n,r,o,i
return __generator(this,(function(s){switch(s.label){case 0:return n=e.uri,r=e.getOffsetAt(t),[4,this._worker(n)]
case 1:return[4,s.sent().getSignatureHelpItems(n.toString(),r)]
case 2:return!(o=s.sent())||e.isDisposed()?[2]:(i={activeSignature:o.selectedItemIndex,activeParameter:o.argumentIndex,signatures:[]},o.items.forEach((function(e){var t={label:"",parameters:[]}
t.documentation=a(e.documentation),t.label+=a(e.prefixDisplayParts),e.parameters.forEach((function(n,r,o){var i=a(n.displayParts),s={label:i,documentation:a(n.documentation)}
t.label+=i,t.parameters.push(s),r<o.length-1&&(t.label+=a(e.separatorDisplayParts))})),t.label+=a(e.suffixDisplayParts),i.signatures.push(t)})),[2,{value:i,dispose:function(){}}])}}))}))},t}(u)
t.SignatureHelpAdapter=p
var g=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideHover=function(e,t,n){return __awaiter(this,void 0,void 0,(function(){var n,r,o,i,s,u
return __generator(this,(function(c){switch(c.label){case 0:return n=e.uri,r=e.getOffsetAt(t),[4,this._worker(n)]
case 1:return[4,c.sent().getQuickInfoAtPosition(n.toString(),r)]
case 2:return!(o=c.sent())||e.isDisposed()?[2]:(i=a(o.documentation),s=o.tags?o.tags.map((function(e){var t="*@"+e.name+"*"
return e.text?t+(e.text.match(/\r\n|\n/g)?" \n"+e.text:" - "+e.text):t})).join("  \n\n"):"",u=a(o.displayParts),[2,{range:this._textSpanToRange(e,o.textSpan),contents:[{value:"```js\n"+u+"\n```\n"},{value:i+(s?"\n\n"+s:"")}]}])}}))}))},t}(u)
t.QuickInfoAdapter=g
var d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideDocumentHighlights=function(e,t,n){return __awaiter(this,void 0,void 0,(function(){var n,r,o,i=this
return __generator(this,(function(a){switch(a.label){case 0:return n=e.uri,r=e.getOffsetAt(t),[4,this._worker(n)]
case 1:return[4,a.sent().getOccurrencesAtPosition(n.toString(),r)]
case 2:return!(o=a.sent())||e.isDisposed()?[2]:[2,o.map((function(t){return{range:i._textSpanToRange(e,t.textSpan),kind:t.isWriteAccess?monaco.languages.DocumentHighlightKind.Write:monaco.languages.DocumentHighlightKind.Text}}))]}}))}))},t}(u)
t.OccurrencesAdapter=d
var f=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideDefinition=function(e,t,n){return __awaiter(this,void 0,void 0,(function(){var n,o,i,a,s,u,c,l,p
return __generator(this,(function(g){switch(g.label){case 0:return n=e.uri,o=e.getOffsetAt(t),[4,this._worker(n)]
case 1:return[4,g.sent().getDefinitionAtPosition(n.toString(),o)]
case 2:if(!(i=g.sent())||e.isDisposed())return[2]
for(a=[],s=0,u=i;s<u.length;s++)c=u[s],l=r.parse(c.fileName),(p=monaco.editor.getModel(l))&&a.push({uri:l,range:this._textSpanToRange(p,c.textSpan)})
return[2,a]}}))}))},t}(u)
t.DefinitionAdapter=f
var m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideReferences=function(e,t,n,o){return __awaiter(this,void 0,void 0,(function(){var n,o,i,a,s,u,c,l,p
return __generator(this,(function(g){switch(g.label){case 0:return n=e.uri,o=e.getOffsetAt(t),[4,this._worker(n)]
case 1:return[4,g.sent().getReferencesAtPosition(n.toString(),o)]
case 2:if(!(i=g.sent())||e.isDisposed())return[2]
for(a=[],s=0,u=i;s<u.length;s++)c=u[s],l=r.parse(c.fileName),(p=monaco.editor.getModel(l))&&a.push({uri:l,range:this._textSpanToRange(p,c.textSpan)})
return[2,a]}}))}))},t}(u)
t.ReferenceAdapter=m
var h=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideDocumentSymbols=function(e,t){return __awaiter(this,void 0,void 0,(function(){var t,n,r,o,i=this
return __generator(this,(function(a){switch(a.label){case 0:return t=e.uri,[4,this._worker(t)]
case 1:return[4,a.sent().getNavigationBarItems(t.toString())]
case 2:return!(n=a.sent())||e.isDisposed()?[2]:(r=function(t,n,o){var a={name:n.text,detail:"",kind:v[n.kind]||monaco.languages.SymbolKind.Variable,range:i._textSpanToRange(e,n.spans[0]),selectionRange:i._textSpanToRange(e,n.spans[0]),tags:[],containerName:o}
if(n.childItems&&n.childItems.length>0)for(var s=0,u=n.childItems;s<u.length;s++){var c=u[s]
r(t,c,a.name)}t.push(a)},o=[],n.forEach((function(e){return r(o,e)})),[2,o])}}))}))},t}(u)
t.OutlineAdapter=h
var _=function(){function e(){}return e.unknown="",e.keyword="keyword",e.script="script",e.module="module",e.class="class",e.interface="interface",e.type="type",e.enum="enum",e.variable="var",e.localVariable="local var",e.function="function",e.localFunction="local function",e.memberFunction="method",e.memberGetAccessor="getter",e.memberSetAccessor="setter",e.memberVariable="property",e.constructorImplementation="constructor",e.callSignature="call",e.indexSignature="index",e.constructSignature="construct",e.parameter="parameter",e.typeParameter="type parameter",e.primitiveType="primitive type",e.label="label",e.alias="alias",e.const="const",e.let="let",e.warning="warning",e}()
t.Kind=_
var v=Object.create(null)
v[_.module]=monaco.languages.SymbolKind.Module,v[_.class]=monaco.languages.SymbolKind.Class,v[_.enum]=monaco.languages.SymbolKind.Enum,v[_.interface]=monaco.languages.SymbolKind.Interface,v[_.memberFunction]=monaco.languages.SymbolKind.Method,v[_.memberVariable]=monaco.languages.SymbolKind.Property,v[_.memberGetAccessor]=monaco.languages.SymbolKind.Property,v[_.memberSetAccessor]=monaco.languages.SymbolKind.Property,v[_.variable]=monaco.languages.SymbolKind.Variable,v[_.const]=monaco.languages.SymbolKind.Variable,v[_.localVariable]=monaco.languages.SymbolKind.Variable,v[_.variable]=monaco.languages.SymbolKind.Variable,v[_.function]=monaco.languages.SymbolKind.Function,v[_.localFunction]=monaco.languages.SymbolKind.Function
var b=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t._convertOptions=function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:n.Smart,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}},t.prototype._convertTextChanges=function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}},t}(u)
t.FormatHelper=b
var y=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideDocumentRangeFormattingEdits=function(e,t,n,r){return __awaiter(this,void 0,void 0,(function(){var r,o,i,a,s=this
return __generator(this,(function(u){switch(u.label){case 0:return r=e.uri,o=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),i=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),[4,this._worker(r)]
case 1:return[4,u.sent().getFormattingEditsForRange(r.toString(),o,i,b._convertOptions(n))]
case 2:return!(a=u.sent())||e.isDisposed()?[2]:[2,a.map((function(t){return s._convertTextChanges(e,t)}))]}}))}))},t}(b)
t.FormatAdapter=y
var S=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),Object.defineProperty(t.prototype,"autoFormatTriggerCharacters",{get:function(){return[";","}","\n"]},enumerable:!0,configurable:!0}),t.prototype.provideOnTypeFormattingEdits=function(e,t,n,r,o){return __awaiter(this,void 0,void 0,(function(){var o,i,a,s=this
return __generator(this,(function(u){switch(u.label){case 0:return o=e.uri,i=e.getOffsetAt(t),[4,this._worker(o)]
case 1:return[4,u.sent().getFormattingEditsAfterKeystroke(o.toString(),i,n,b._convertOptions(r))]
case 2:return!(a=u.sent())||e.isDisposed()?[2]:[2,a.map((function(t){return s._convertTextChanges(e,t)}))]}}))}))},t}(b)
t.FormatOnTypeAdapter=S
var w=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideCodeActions=function(e,t,n,r){return __awaiter(this,void 0,void 0,(function(){var r,o,i,a,s,u,c=this
return __generator(this,(function(l){switch(l.label){case 0:return r=e.uri,o=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),i=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),a=b._convertOptions(e.getOptions()),s=n.markers.filter((function(e){return e.code})).map((function(e){return e.code})).map(Number),[4,this._worker(r)]
case 1:return[4,l.sent().getCodeFixesAtPosition(r.toString(),o,i,s,a)]
case 2:return!(u=l.sent())||e.isDisposed()?[2]:[2,{actions:u.filter((function(e){return 0===e.changes.filter((function(e){return e.isNewFile})).length})).map((function(t){return c._tsCodeFixActionToMonacoCodeAction(e,n,t)})),dispose:function(){}}]}}))}))},t.prototype._tsCodeFixActionToMonacoCodeAction=function(e,t,n){for(var r=[],o=0,i=n.changes;o<i.length;o++)for(var a=0,s=i[o].textChanges;a<s.length;a++){var u=s[a]
r.push({resource:e.uri,edit:{range:this._textSpanToRange(e,u.span),text:u.newText}})}return{title:n.description,edit:{edits:r},diagnostics:t.markers,kind:"quickfix"}},t}(b)
t.CodeActionAdaptor=w
var x=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideRenameEdits=function(e,t,n,r){return __awaiter(this,void 0,void 0,(function(){var r,o,i,a,s,u,c,l,p,g
return __generator(this,(function(d){switch(d.label){case 0:return r=e.uri,o=r.toString(),i=e.getOffsetAt(t),[4,this._worker(r)]
case 1:return[4,(a=d.sent()).getRenameInfo(o,i,{allowRenameOfImportPath:!1})]
case 2:if(!1===(s=d.sent()).canRename)return[2,{edits:[],rejectReason:s.localizedErrorMessage}]
if(void 0!==s.fileToRename)throw new Error("Renaming files is not supported.")
return[4,a.findRenameLocations(o,i,!1,!1,!1)]
case 3:if(!(u=d.sent())||e.isDisposed())return[2]
for(c=[],l=0,p=u;l<p.length;l++)g=p[l],c.push({resource:monaco.Uri.parse(g.fileName),edit:{range:this._textSpanToRange(e,g.textSpan),text:n}})
return[2,{edits:c}]}}))}))},t}(u)
t.RenameAdapter=x})),define("vs/language/typescript/tsMode",["require","exports","./workerManager","./languageFeatures"],(function(e,t,n,r){"use strict"
var o,i
function a(e,t){var o=new n.WorkerManager(t,e),i=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
return o.getLanguageServiceWorker.apply(o,e)}
return monaco.languages.registerCompletionItemProvider(t,new r.SuggestAdapter(i)),monaco.languages.registerSignatureHelpProvider(t,new r.SignatureHelpAdapter(i)),monaco.languages.registerHoverProvider(t,new r.QuickInfoAdapter(i)),monaco.languages.registerDocumentHighlightProvider(t,new r.OccurrencesAdapter(i)),monaco.languages.registerDefinitionProvider(t,new r.DefinitionAdapter(i)),monaco.languages.registerReferenceProvider(t,new r.ReferenceAdapter(i)),monaco.languages.registerDocumentSymbolProvider(t,new r.OutlineAdapter(i)),monaco.languages.registerDocumentRangeFormattingEditProvider(t,new r.FormatAdapter(i)),monaco.languages.registerOnTypeFormattingEditProvider(t,new r.FormatOnTypeAdapter(i)),monaco.languages.registerCodeActionProvider(t,new r.CodeActionAdaptor(i)),monaco.languages.registerRenameProvider(t,new r.RenameAdapter(i)),new r.DiagnosticsAdapter(e,t,i),i}Object.defineProperty(t,"__esModule",{value:!0}),t.setupTypeScript=function(e){i=a(e,"typescript")},t.setupJavaScript=function(e){o=a(e,"javascript")},t.getJavaScriptWorker=function(){return new Promise((function(e,t){if(!o)return t("JavaScript not registered!")
e(o)}))},t.getTypeScriptWorker=function(){return new Promise((function(e,t){if(!i)return t("TypeScript not registered!")
e(i)}))}}))
