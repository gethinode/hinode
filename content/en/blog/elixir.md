---
author: "Raffael"
title: "Alchemie, Elixir und verteilt skalierbare Software"
date: 2022-04-16
description: "Elixir ist eine relativ neue Programmiersprache aus dem Jahr 2014, welche neben dem funktionalen Paradigma auch die Open Telecom Platform von Erlang als Runtime-Target im Einsatz hat. Die OTP ist eine perfekte Runtime für verteilte Systeme und stellt alle nötigen Komponenten bereit, um ein solches System zu programmieren."
tags: ["elixir"]
thumbnail: img/Elixir-Banner.jpg
photoCredits: <a href="https://unsplash.com/@frederickjmedina">Frederick Medina</a>
photoSource: <a href="https://unsplash.com/photos/PdfRE-xB--s">Unsplash</a>
---

![Image](img/Elixir-Banner.jpg "img/Elixir-Banner.jpg")

Das Jahr 2022 steht für mich persönlich ganz im Zeichen von **Distributed Systems**, zu Deutsch *verteilte Systeme*. Aus diesem Grund befasse ich mich in einer neuen TechUp-Serie mit verteilten Systemen im Allgemeinen, wie auch deren Konzipierung mit Elixir und dessen Ökosystem. Zuerst legen wir den Fokus auf Elixir, um Grundkonzepte von verteilten Systemen praktisch mit einer Programmiersprache dingfest zu machen. Danach werden wir uns theoretische Konzepte sowie weiterführende Themen rund um verteilte Systeme anschauen. Dies wird in die folgenden zwei TechUp-Serien aufgeteilt:

- Elixir Series
- Distributed System Series

Bei b-nova haben wir vergangenes Jahr viele neue Technologien und insbesondere mit Kotlin, Go und Rust auch **trendige Programmiersprachen** unter die Lupe genommen. Mit **Elixir** haben wir eine weitere Programmiersprache am Start, welche sich nicht zuletzt dadurch auszeichnet, die vom Release-Zeitpunkt her **neuste** Programmiersprache zu sein, sondern, abgesehen von Rust, ein komplett neues Paradigma der **funktionalen Programmierung**, sowie eine **Actor-basierte Runtime** aufweist. Zwei durchaus nennenswerte Features, welche nicht unbetont bleiben dürfen. Die Elixir Series wird in drei Teile aufgeteilt, da ich die hinter Elixir verborgenen Konzepte ein wenig besser beleuchten möchte, sodass die Vorteile die Elixir mit sich bringt besser verstanden und aufgenommen werden können. Nehmen wir vielleicht einen Schritt zurück und fangen bei den Anfängen der Sprache an.

💡 Das Demonym von einem Elixir-Entwickler ist ganz intuitiv ein **Alchemist**. ⚗️🤓



# I. Von Erlang zu Elixir

Elixir selber dürfte nicht zwingend jedem Entwickler einen Begriff sein, dessen Vorgänger und Urvater Erlang hingegen aber schon eher. Wenn man Elixir als Programmiersprache und dessen Innovationsmöglichkeiten verstehen möchte, so macht es hier sicherlich Sinn Elixir im Kontext von Erlang verstehen zu versuchen. Somit müssen wir rund 35 Jahre zurück in die Vergangenheit, ans Ende der 1980er Jahre, kurz bevor das Internet seine erste interkontinentale Verbindung herstellen konnte.

Im Jahr 1986 standen die Ingenieure der in Stockholm ansässigen Telekommunikationsfirma **Ericsson** vor einem entscheidenden Problem. Sie wollten nämlich zuverlässiges digitales [Telefon-Switching](https://en.wikipedia.org/wiki/Telephone_exchange), also das verbinden von Anrufen, was bis anhin noch von Hand in Telefonzentralen gemacht wurde, ermöglichen. Das wichtigste Kriterium dieser Applikation war **keine Downtime** aufzuweisen, um somit für ununterbrochenes Telefonieren zu sorgen. Dies veranlasste **Joe Armstrong** eine neue Programmiersprache zu entwickeln. Diese Programmiersprache kennen wir heute unter dem Namen **Erlang**, was für _Ericsson Language_ steht. Die Eigenschaften, die Erlang und dessen Runtime aufweisen, waren zu diesem Zeitpunkt nicht vorgegeben und sind ein Produkt des eigentlichen Ausgangsproblems, nämlich für einen zuverlässigen Betrieb von Schaltzentralen zu sorgen. Die daraus resultierende Eigenschaften lassen sich auf folgende 4 Kernpunkte zusammenfassen:

*   **Green Threads:** Threads werden durch die VM ge*scheduled* und nicht etwa durch das Betriebssystem.
    
*   **AMQP (Advanced Message Queueing Protocol)**: Open Standard Application Layer Protocol for Message-oriented Middleware.
    
*   **Continuous Delivery**: Kurze Ausrollzyklen.
    
*   **Functional Programming**: Funktionales Paradigma.

Aus heutiger Sicht wird recht schnell klar, dass Erlang schon von Anfang an Features am Start hatte, die wir uns heute regelmässig zu Nutzen machen. Joe Armstrong hat dies auch erkannt und an einer ElixirConf vor ein paar Jahren folgende Aussage gemacht:

> “The rise in popularity of the Internet and the need for non-interrupted availability of services has extended the class of problems that Erlang can solve.”
> 
> — Joe Armstrong (†2019)

Falls man ein tieferen Einblick in die Geschichte und Evolution von Erlang erfahren möchte, kann ich den Artikel [History of Erlang and Elixir](https://serokell.io/blog/history-of-erlang-and-elixir) von Serokell sehr empfehlen.

!---
![](Elixir-Timeline.jpg)
!---

Die Geschichte von Elixir beginnt mit der Entwicklung und Bereitstellung von Erlang (1986), sowie der ersten vollwertigen Virtual Machine, Joe’s Abstract Machine (1989), genannt nach dessen Entwickler Joe Armstrong. Diese Virtual Machine wurde danach komplett neu geschrieben und trägt seither den Namen **BEAM**, kurz für **Bodgan’s/Björn’s Erlang Abstract Machine**. Diese Runtime wurde so weiterentwickelt, dass man mehrere Instanzen der Runtime miteinander verbinden konnte und die einzelnen Prozesse auf den ganzen Cluster von Runtimes verteilen konnte. Diese Networking Fähigkeit ist hier oben auf dem Zeitstrahl mit **Distributed Erlang** gekennzeichnet. Die **Open Telecom Platform**, kurz **OTP**, ist die Gesamtheit aller Toolings, Bibliotheken und Standardfunktionen der Erlang-Landschaft. Erlang, wie auch die OTP wurden 1998 **Open-Source** gemacht und sind somit frei für die Öffentlichkeit zugänglich.

Es brauchte ein bisschen mehr als 10 Jahre bis **Elixir** das Licht der Welt erblicken durfte, was im Grund genommen eine Neuauflage von Erlang und dessen OTP-Plattform ist. Elixir reinszeniert die Erlang-Sprache mit einem Ruby-artigen Syntax und birgt durch verfeinertes Tooling noch mehr Komfort. Der Kern bleibt aber weiterhin die BEAM und die OTP. Phoenix ist Elixir's Web-Framework schlechthin und genau so wichtig für Elixir wie Ruby on Rails für Ruby.

Bevor wir weiter auf Elixir eingehen, möchte ich kurz ein wenig Erlang-Code zeigen. Hier habe ich ein _Hello World_\-Snippet in **Erlang** für dich am Start.

###### hello-world.erl

```erlang
% hello world program
-module(helloworld). 
-export([start/0]). 

start() -> 
   io:fwrite("Hello, world!\n").
```

Zusammenfassend kann festgehalten werden, dass sich Elixir in erster Linie als eine Weiterentwicklung und Modernisierung der Erlang-Programmiersprache versteht und genau wie Erlang auf dem gleichen Interpreter, der Erlang Virtual Machine, läuft und auch die gleichen Entwicklungstools der Open Telecom Platform zur Anwendung kommen.

## Installation und Tooling

Da wir gleich ein praktisches Beispiel der BEAM vornehmen werden, müssen wir zuerst die nötigen Tools installieren. Dabei werden wir in einem ersten Schritt Elixir und Erlang aufsetzen, beide werden separat installiert. Hier werden wir dafür MacOS als Zielbetriebssystem nutzen, aber die Installation kann auch gut auf Windows, GNU/Linux oder Unix-Variationen wie BSD vorgenommen werden. Halten Sie sich dabei einfach an die jeweilige öffentliche Dokumentation von Elixir, sowie Erlang.

Elixir kann auf MacOS ganz einfach mit **Homebrew** installiert werden.

```bash
❯ brew install elixir
```

Alternativ kann man sich Elixir über den **Sourcecode** bauen lassen.

```bash
❯ git clone https://github.com/elixir-lang/elixir.git
❯ cd elixir
❯ make clean test
```

Für _containerisierte_ Build-Pipelines stellt Elixir offizielle [Hex.pm](http://Hex.pm) Docker-Images zur Verfügung. Weitere Informationen zur Installation, zum Beispiel für alternative Betriebssysteme wie Windows findet man [hier](https://elixir-lang.org/install.html). Die Installation beinhaltet **4 Exectuables**:

*   `elixir`: Die Runtime
    
*   `elixirc`: Der Compiler
    
*   `iex`: Akronym für Interactive Elixir und somit REPL für die Sprache
    
*   `mix`: Das Build-Tool
    

Neben den Executables kommen noch Elixir-spezifische Module wie beispielsweise **ExUnit**, **EEx**, **Logger**, sowie die **Standardbibliothek** hinzu. Da Elixir extensiv von der OTP gebrauch macht, müssen wir nun auch noch **Erlang** installieren. Dies geht aber mit einem entsprechenden Package-Manager wie Homebrew ebenfalls sehr zügig:

```bash
❯ brew install erlang
```

Zum Zeitpunkt der Verfassung dieses TechUps im März 2022 ist die aktuellste Elixir-Version die **1.13.3**. Somit haben wir jetzt diese Version zusammen mit der Erlang/OTP-Version 24 am Start.

```bash
❯ elixir --version
Erlang/OTP 24 [erts-12.1.5] [source] [64-bit] [smp:10:10] [ds:10:10:10] [async-threads:1] [dtrace]

Elixir 1.13.3 (compiled with Erlang/OTP 24)
```

Für Elixir gibt es auch einen Package Manager namens Hex, welchen wir hier mit Mix installieren können. Damit können wir externe Dependencies wie Phoenix installieren und managen.

```bash
❯ mix local.hex
```

Nun sind wir bereit und mit allen nötigen Mitteln gewappnet um mehr über Elixir, Erlang, OTP und die BEAM in Erfahrung zu bringen. Let’s do this! 😄



# II. Die BEAM

Wie bereits mehrfach erwähnt verwendet Elixir, genau wie Erlang, eine Runtime zur Laufzeit, welche auch gerne **Erlang Virtual Machine** genannt wird. Die offizielle Bezeichnung hingegen ist **BEAM** und steht als Akronym für **Bogdan/Björn’s Erlang Abstract Machine**. Bogumil “Bogdan” Hausman schrieb die erste Version der Runtime. Björn Gustavsson ist der aktuelle Betreiber und Maintainer der heutigen BEAM-Codebase. Beide arbeiteten als Mitarbeiter von Ericsson an der BEAM. Die erste Kategorisierung, die ich hier erwähnen möchte, ist die Tatsache dass die BEAM als eine **registerbasierte Virtual Machine** gilt wohingegen die altbekannte JVM beispielsweise eine Stack-basierte Architektur aufweist. Das soll aber nicht der einzige gewichtiger Unterschied zwischen der BEAM und anderen konventionellen Runtimes sein. Daher nehmen wir uns die Seele der Elixir-Programmiersprache, die BEAM, etwas genauer unter die Lupe.

💡  **Für die Neugierigen:**

**Registerbasierte Virtual Machines** nutzen das Operandenregister der CPUs für die Datenverarbeitung und haben somit weniger Overhead, was sie potenziell in der _Execution Rate_ ein wenig schneller macht. Beispiel für eine Register-Operation:

`ADD R1, R2, R3`

Eine **stackbasierte Virtual Machine** hingegen nutzt die konventionelle Art Maschinencode auszuführen, nämlich den Stack und muss dementsprechend die ganze Operation beinhalten, was zu mehr Overhead führt. Beispiel für eine Stack-basierte Operation:

`1: POP 20`

`2: POP 7`

`3: ADD 20, 7, result`

`4. PUSH result`

Hier ein [weiterführender Artikel](https://medium.com/flatiron-labs/elixir-and-the-beam-how-concurrency-really-works-3cc151cddd61) zu Elixir und der Beam auf Englisch.

!---
![](Elixir-Compilation-to-BEAM.jpg)
!---

Die BEAM interpretiert `.beam`\-Bytecode und verhält sich nicht unähnlich zu der JVM, welche kompilierten `.class`\-Bytecode interpretiert und ausführt. Es gibt zwei Programmiersprachen welche die BEAM als Zielsystem haben; Erlang und Elixir. Beide Sprachen weisen Sourcecode-Extensions auf, welche durch den jeweiligen Compiler, entweder _elixirc_ oder _erlangc_, zu `.beam`\-Bytecode kompiliert wird. Die Extensions für Elixir sind folgende zwei:

*   `.ex`: Steht einfach für Elixir und ist typischerweise Sourcecode der eigentlichen Applikation
    
*   `.exs`: Steht für Elixir Script und wird zur Compile-Time zwar mitkompiliert, kann aber per REPL direkt interpretiert werden und dient als Marker für Ausführung zur Build-Time.

Beam-Bytecode kann man auch aufschlüsslen, das würde beispielsweise wie folgt aussehen:

```elixir
Module:  Elixir.WebserviceWeb

Attributes: [{vsn, [67211B8D3EC7D192EC7436BA41798E56]}]

Compilation Info: [{version, 8.0.3}, {options, [no_spawn_compiler_process, from_core, no_core_prepare, no_auto_import]}, {source, /Users/rschneider/Development/sandbox/webservice/lib/webservice_web.ex}]


//Function  Elixir.WebserviceWeb:__info__/1
label01:  func_info            Elixir.WebserviceWeb __info__ 1
label02:  select_val           X[0] label01 [attributes, label08, compile, label08, deprecated, label07, exports_md5, label06, functions, label05, macros, label04, md5, label08, module, label03]
label03:  move                 Elixir.WebserviceWeb X[0]
          return              
label04:  move                 [{__using__, 1}] X[0]
          return              
label05:  move                 [{channel, 0}, {component, 0}, {controller, 0}, {live_component, 0}, {live_view, 0}, {router, 0}, {view, 0}] X[0]
          return              
label06:  move                 kO�����:�}55�� X[0]
          return              
label07:  move                 nil X[0]
          return              
label08:  move                 X[0] X[1]
          move                 Elixir.WebserviceWeb X[0]
          call_ext_only        2 erlang:get_module_info/2

//Function  Elixir.WebserviceWeb:MACRO-__using__/2
label09:  func_info            Elixir.WebserviceWeb MACRO-__using__ 2 //line lib/webservice_web.ex, 107
label10:  is_atom              label09 X[1]
          allocate             0 2
          move                 Elixir.WebserviceWeb X[0]
          apply_last           0 0 //line lib/webservice_web.ex, 108
```



## Verteiltes System

Joe Armstrong erkannte schon früh, dass die Parallelisierung von Prozessen das Hauptmerkmal von robusten und Fehlertoleranten Systemen ist.

> _Initially, I wasn’t really interested in concurrency as such, I was interested in how you make fault-tolerant systems. A characteristic of these systems were that they handle hundreds of thousands of telephone calls at the same time._
> 
> — Joe Armstrong (†2019) Quelle: [https://www.erlang-solutions.com/blog/lets-talkconcurrency-with-joe-armstrong/](https://www.erlang-solutions.com/blog/lets-talkconcurrency-with-joe-armstrong/)

Die Bezeichnung **Concurrency-Orientierte Programmierung** wäre hier sicherlich angebracht. Ein weitere Einsicht die Joe in diesem Kontext hervorhebt ist der Umstand, dass Systeme am besten konzeptioniert sind, wenn man die reale Welt als Vorbild nimmt und diese versucht so gut wie möglich in der abstrakten Programmierwelt abzubilden.

> _The world is parallel. If we wish to write programs that behave as other objects behave in the real world then these programs will have a concurrent structure…People function as independent entities that communicate by sending messages. That’s how Erlang processes work…Erlang programs are made up of lots of little processes all chattering away to each other — just like people._
> 
> — Joe Armstrong (†2019) Quelle: [http://armstrongonsoftware.blogspot.com/2006/08/concurrency-is-easy.html](http://armstrongonsoftware.blogspot.com/2006/08/concurrency-is-easy.html)

Die BEAM ist dafür zuständig, Prozesse zu parallelisieren, was im OTP-Slang, genau wie in der Container-Orchestrierung mit Kubernetes, **Scheduling** genannt wird. Für jeden CPU-Core wird jeweils ein OS-Thread durch die BEAM zur Verfügung gestellt, worauf dann zur Laufzeit Erlang-Prozesse verteilt werden. Dieser Scheduling-Prozess bildet mit der Anzahl von CPU-Cores, welche im Netzwerk-Verbund weiter gesteigert werden kann, einen Cluster mit dem die Parallelisierung von Prozessen ermöglicht wird.

!---
![](Elixir-BEAM-Architecture.jpg)
!---



## Demonstration der BEAM

In der Erlang-/Elixir-Community gibt es viele prominente Promoter, die das ganze BEAM-Ökosystem fördern und dessen Vorteile an den verschiedenen Meetups und Konferenzen aufzeigen. Einer davon ist Saša Jurić, teilweise besser unter seinem Blogtitel **The Erlangelist** bekannt. Saša hat an der GOTO 2019 einen Vortrag mit dem Titel **[The Soul of Erlang and Elixir](https://www.youtube-nocookie.com/embed/JvBT4XBdoUE)** gehalten, worin er die BEAM auf praktische Weise präsentiert und die wichtigsten Eigenschaften in nur einer Stunde kurz und bündig auf den Punkt gebracht hat.

Ich werde im Rahmen meines TechUps versuchen, diese Punkte nach seinem Vorbild aufzuzeigen und hoffe, dadurch die BEAM attraktiver zu machen. Es gibt ein inoffizielles Repo, welches den Demo-Server von Saša nachstellen soll. Dieses kann man per Git [anhand dieser Anleitung](https://github.com/lovebes/demo_system) downloaden und installieren.

```bash
❯ git clone https://github.com/lovebes/demo_system.git
❯ cd example_system
❯ mix deps.get && pushd assets && npm install && popd && mix compile
```

💡 Da das oben genannte Repository auf einer **älterer Codebase** basiert und diese dadurch teilweise **veraltete Versionen** der Runtimes verwendet, gibt es eine dafür konzipierte Shell-Utility namens [asdf](http://asdf-vm.com/). Das ist ein sogenannter **Version Manager**, mit dem man ganz einfach auf eine alte Version von Elixir, Erlang oder Node.js im Kontext eines Projektes oder Verzeichnisses switchen kann.

💡 Die Versionen sind bei asdf in einer `.tool-versions` Datei im Zielverzeichnis hinterlegt. Nun gilt es sicherzustellen, dass man die Plugins für die jeweiligen Runtimes, beispielsweise _nodejs_ installiert hat. Dann einfach im Projektverzeichnis den `$ asdf install`\-Befehl ausführen und in den Genuss der gewünschten Runtime-Version kommen.

Starten wir den `example_system`\-Server mit Mix wie folgt:

```elixir
❯ iex -S mix phx.server
Erlang/OTP 24 [erts-12.1.5] [source] [64-bit] [smp:10:10] [ds:10:10:10] [async-threads:1] [dtrace]

warning: function aliases/0 is unused
  mix.exs:68

warning: use Mix.Config is deprecated. Use the Config module instead
  config/config.exs:6

warning: use Mix.Config is deprecated. Use the Config module instead
  config/dev.exs:1

[info] [swarm on nonode@nohost] [tracker:init] started
Metrics init(). Subscribes to LoadControl.Stats.subscribe() through LoadControl.subscribe_to_stats: #PID<0.1481.0>
LoadControl.Stats subscribe() - pid calling subscribe function (probably LoadControl): #PID<0.1481.0>
[info] Running ExampleSystemWeb.Endpoint with cowboy 2.9.0 at 0.0.0.0:4000 (http)
[info] Access ExampleSystemWeb.Endpoint at http://localhost:4000
Load Control change_load request with desired_load: 0
[watch] build finished, watching for changes...
Interactive Elixir (1.13.0) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> [info] [swarm on nonode@nohost] [tracker:cluster_wait] joining cluster..
[info] [swarm on nonode@nohost] [tracker:cluster_wait] no connected nodes, proceeding without sync
```

Der Server startet ein lokal aufrufbares Interface, welches man unter `localhost:4000` aufrufen kann. Dort findet man ein Feld worin man eine Kalkulation anhand eines Zahleingabefeldes vornehmen kann. Unter `http://localhost:4000/load` kann man die Server-Load einsehen.

!---
![](screenshot1.jpg)
!---

Wie wir sehen, können wir eine beliebige Anzahl von Jobs starten, welche im Hintergrund eine Kalkulation vornehmen und einen Success-Status zurückliefern, welcher in der linken Grafik in Echtzeit dargestellt wird. Wir kurbeln diese Zahl mal versuchsweise auf 10’000 hoch und sehen, dass ein Scheduler dies noch gut verkraften mag. Ein **Scheduler ist hier ein Thread**, auf dem unsere Jobs laufen. Zudem müssen wir wissen, dass ein Thread in der BEAM immer einem CPU-Kern zugewiesen wird. Mit dem neuen M1-basierten MacBook Pro habe ich 10 CPU-Kerne zur Verfügung und könnte die Anzahl Scheduler, was der Anzahl genutzter Kerne entspricht, bis auf 10 hochschrauben.

Wenn wir jetzt in der Eingabefeld-Ansicht unter `http://localhost:4000` einfach eine manuelle Kalkulation veranlassen wird je nach Zahlenwert die CPU beansprucht. Beim Wert 1000 ist alles noch grün und wir sehen auch, dass dies keinen nennenswerten Einfluss auf die Grundlast von 10’000 Prozessen hat. Falls wir eine genug hohe Zahl wählen, beispielsweise ein Wert von 999999999 (~10^9), dauert es bei meinem M1-Biest bis zu 3 Sekunden bis das Ergebnis vorliegt. Bei höheren Werten können wir eine **proportionale Steigerung** der Rechendauer annehmen, da im Output ersichtlich wird dass hier die Summierung aller Zahlenwerten zwischen 1 und dem Eingabewert vorgenommen wird, sprich ∑(1 + 2 + ... + 999999999).

### Etwas ist faul

Beim Ausprobieren merkt man schnell; Der Wert 13 liefert einen fachlichen Fehler und **Minuswerte dauern ewig lange**. Bei den Minuswerten wird es spannend, denn diese laufen offensichtlich unendlich lange, sobald man mal einen eingegeben hat. So kommen wir zu unserem eigentlichen Use-Case und dem praktischen Teil der BEAM-Vorstellung. Gehen wir also diesem **Fehlverhalten** mal auf den Grund.

Dazu schauen wir uns in der REPL an, was es für laufende Prozesse gibt. Das geht einfach mit dem `Process`\-Modul:

```elixir
iex(2)> Process.list
[#PID<0.0.0>, #PID<0.1.0>, #PID<0.2.0>, #PID<0.3.0>, #PID<0.4.0>, #PID<0.5.0>,
 #PID<0.6.0>, #PID<0.7.0>, #PID<0.10.0>, #PID<0.42.0>, #PID<0.44.0>,
 #PID<0.46.0>, #PID<0.47.0>, #PID<0.49.0>, #PID<0.50.0>, #PID<0.51.0>,
 #PID<0.52.0>, #PID<0.53.0>, #PID<0.54.0>, #PID<0.55.0>, #PID<0.56.0>,
 #PID<0.57.0>, #PID<0.58.0>, #PID<0.59.0>, #PID<0.60.0>, #PID<0.61.0>,
 #PID<0.62.0>, #PID<0.63.0>, #PID<0.64.0>, #PID<0.65.0>, #PID<0.66.0>,
 #PID<0.67.0>, #PID<0.68.0>, #PID<0.69.0>, #PID<0.70.0>, #PID<0.71.0>,
 #PID<0.77.0>, #PID<0.81.0>, #PID<0.82.0>, #PID<0.83.0>, #PID<0.84.0>,
 #PID<0.85.0>, #PID<0.87.0>, #PID<0.88.0>, #PID<0.89.0>, #PID<0.90.0>,
 #PID<0.91.0>, #PID<0.92.0>, #PID<0.109.0>, #PID<0.110.0>, ...]
```

💡 **Arität** ist ein wichtiger [Begriff](https://elixirschool.com/en/lessons/basics/functions/#function-naming-and-arity-3) in Erlang und Elixir und bezeichnet die Anzahl Parameter, die eine Funktion entgegen nehmen kann. Elixir kann Funktionen überladen, aber die Arität ist immer bezeichnend für eine gegeben Funktion. Beispielsweise hat die Funktion `Process.list/0` eine Arität von 0. Funktionen wird also stets mit einem Schrägstrich und dem Aritätswert gekennzeichnet.

Wenn man den Output von `Process.list/0` nimmt und dessen Head isoliert darstellen möchte, kann man das ganz funktional wie folgt tun:

```elixir
iex(7)> Process.info(hd(Process.list)) 
[
  registered_name: :init,
  current_function: {:init, :loop, 1},
  initial_call: {:erl_init, :start, 2},
  status: :waiting,
  message_queue_len: 0,
  links: [#PID<0.42.0>, #PID<0.44.0>, #PID<0.10.0>],
  dictionary: [],
  trap_exit: true,
  error_handler: :error_handler,
  priority: :normal,
  group_leader: #PID<0.0.0>,
  total_heap_size: 987,
  heap_size: 987,
  stack_size: 3,
  reductions: 9347,
  garbage_collection: [
    max_heap_size: %{error_logger: true, kill: true, size: 0},
    min_bin_vheap_size: 46422,
    min_heap_size: 233,
    fullsweep_after: 65535,
    minor_gcs: 0
  ],
  suspending: []
]
```

Das `reductions`\-Feld zählt die Iterationen des Prozesses auf und eignet sich somit perfekt um herauszufinden, ob ein gegebener Prozess viel CPU-Leistung braucht. Die Zeitdifferenz zwischen einem `reductions`\-Wert _t1_ und _t2_ ist das **Mass dieser CPU-Usage**. Natürlich möchten wir jetzt diese Information über alle vorhandenen Prozesse zu einer gegebenen Zeit herausfinden und nach dem Wert sortieren. In einem Custom-Modul namens `Runtime` wird genau diese Funktion `Runtime.top` abgebildet.

```elixir
iex(4)> Runtime.top()
[
  %{cpu: 8, pid: #PID<0.1570.0>},
  %{cpu: 1, pid: #PID<0.1503.0>},
  %{cpu: 1, pid: #PID<0.1481.0>},
  %{cpu: 0, pid: #PID<0.413.0>},
  %{cpu: 0, pid: #PID<0.414.0>},
  %{cpu: 0, pid: #PID<0.1565.0>},
  %{cpu: 0, pid: #PID<0.11139.0>},
  %{cpu: 0, pid: #PID<0.9245.0>},
  %{cpu: 0, pid: #PID<0.8682.0>},
  %{cpu: 0, pid: #PID<0.8304.0>}
]
```

Jetzt packen wir den **leistungsintensivsten PID in eine Variable** mit demselben Namen.

```elixir
iex(5)> pid = hd(Runtime.top()).pid
#PID<0.1520.0>
```

💡 Ein **Atom** ist in Elixir ein eigener spezifischer und wichtiger [Datentyp](https://elixir-lang.org/getting-started/basic-types.html#atoms). Laut Definition ist ein Atom eine Konstante deren Wert auch ihr Name ist. Atoms werden immer dort genutzt, wo ein expliziter Wert programmiertechnisch im Voraus bekannt ist und als solcher explizit eingebettet wird. Atoms erkennt man daran, dass der Wert immer mit einem Semikolon angeführt wird. _Beispiel:_ `:current_stacktrace`

Mit dem `Process`\-Modul können wir den Stacktrace des Prozesses herausfiltern. Dafür verwenden wir zusätzlich das Atom `:current_stacktrace` als zweiten Parameterwert.

```elixir
iex(6)> Process.info(pid, :current_stacktrace)
{:current_stacktrace,
 [
   {ExampleSystem.Math, :calc_sum, 3,
    [file: 'lib/example_system/math.ex', line: 20]},
   {ExampleSystem.Math, :"-sum/1-fun-0-", 2,
    [file: 'lib/example_system/math.ex', line: 10]},
   {Task.Supervised, :invoke_mfa, 2, [file: 'lib/task/supervised.ex', line: 89]},
   {:proc_lib, :init_p_do_apply, 3, [file: 'proc_lib.erl', line: 226]}
 ]}
```

Es gibt in unserem `Runtime`-Modul auch eine Funktion, welche den Trace-Output bis zu 50 Traces zurückverfolgt.

```elixir
iex(8)> Runtime.trace(pid)
[
  {ExampleSystem.Math, :calc_sum, [11750412094, -1, 69036092183535526371]},
  {ExampleSystem.Math, :calc_sum, [11750412095, -1, 69036092195285938465]},
  {ExampleSystem.Math, :calc_sum, [11750412096, -1, 69036092207036350560]},
  {ExampleSystem.Math, :calc_sum, [11750412097, -1, 69036092218786762656]},
  {ExampleSystem.Math, :calc_sum, [11750412098, -1, 69036092230537174753]},
  {...}
]
```

Hier können wir gut erkennen, dass eine Funktion `calc_sum` aus dem `ExampleSystem.Math`-Modul stets aufgerufen wird.

```elixir
iex(9)> Process.exit(pid, :kill)
true
```

Nach dem Kill-9 sehen wir, dass die CPU-Gesamtauslastung schlagartig abfällt und der Leistungsintensivste Prozess somit richtig identifiziert und beendet wurde.

!---
![](screenshot2.png)
!---

Durch die ursprüngliche Trace-Ausgabe wissen wir, wo wir nach dem Fehler suchen müssen, nämlich in `lib/example_system/math.ex`. Bevor wir aber in die `math.ex` springen, schauen wir mal, ob wir im Web etwas zu Math finden. Vielleicht können wir schonmal was in der UI anpassen, sodass man den Wert erst gar nicht mehr eingeben kann. Man suche und wird fündig: Es gibt ein `lib/example_system_web/math/sum.ex` welches folgende `start_sum`\-Funktion aufweist:

```elixir
  defp start_sum(socket, str_input) do
    operation =
      case Integer.parse(str_input) do
        :error ->
          %{pid: nil, input: str_input, result: "invalid input"}

        {_input, remaining} when byte_size(remaining) > 0 ->
          %{pid: nil, input: str_input, result: "invalid input"}

        # commented to show that this will be a runaway, endless calculation error
        # {input, ""} when input <= 0 ->
        #   %{pid: nil, input: input, result: "invalid input"}

        {input, ""} ->
          do_start_sum(input)
      end

    socket |> update(:operations, &[operation | &1]) |> assign(:data, data())
  end
```

Das Problem ist, dass die Funktion die Möglichkeit nicht berücksichtigt, dass es auch Zahlen kleiner gleich 0 als Input geben kann und nicht nur natürliche Zahlen. Das kann man beheben, indem man diesen Fall abprüft. In einem Kommentar ist genau dieser Mechanismus bereits gegeben und der code lässt sich einfach auskommentieren um dies zu fixen.

```elixir
{input, ""} when input <= 0 -> %{pid: nil, input: input, result: "invalid input"}
```

Dieser Change wird von Phoenix automatisch erkannt, neu kompiliert und geladen. Danach kann man schauen und siehe da! Beim Input von negativen Zahlenwerten wird _“invalid input”_ als Antwort ausgegeben.

So, zurück zu unserem Math-Modul, dort ist offensichtlich immer noch was faul. In der `math.ex` gibt es folgende 4 private `calc_sum`\-Funktionen mit unterschiedlichen Aritäten.

```elixir
  defp calc_sum(13), do: raise("error")
  defp calc_sum(n), do: calc_sum(1, n, 0)

  defp calc_sum(from, from, sum), do: sum + from
  defp calc_sum(from, to, acc_sum), do: calc_sum(from + 1, to, acc_sum + from)
```

Hier sehen wir schon, dass der Wert 13 schon vorweg abgefangen wird und mit `raise("error")` einen fachlichen Fehler geworfen wird. Des Weiteren scheint die ganze Logik ein wenig suspekt und womöglich ineffizient.

```elixir
defp calc_sum(n), do: div(n * (n + 1), 2)
```

Falls wir dies testen wollen, können wir die Logik nochmals testen lassen.

```elixir
❯ mix test
.....

Finished in 0.5 seconds (0.2s async, 0.2s sync)
4 properties, 1 test, 0 failures

Randomized with seed 494934
```

Und rollen die kompilierten Changes auf den laufenden Cluster aus.

```elixir
❯ mix system.upgrade
Compiling 2 files (.ex)
Upgrade finished successfully.
```

Alternativ dazu kann man, falls man in der REPL noch angemeldet ist, das Projekt nochmals kompilieren und die Changes automatisch ausrollen lassen.

```elixir
iex(10)> recompile
Compiling 1 file (.ex)
:ok
```

Jetzt sollte der Fehler bei der Eingabe von negativen Zahlen, sowie die Performance der Kalkulation viel besser ausfallen. Gut gemacht! Halten wir noch gewisse Punkte für die BEAM fest. 🚀



## BEAM in a nutshell

Die Erlang Virtual Machine stellt eine Vielzahl von einzigartigen Eigenschaften bereit, welche man vergebens in anderen Stacks suchen wird. Diese Eigenschaften lassen sich wie folgt zusammenfassen:

*   Ein von Grund auf verteiltes System (**distributed**)
    
*   Kann mit fehlerhaften Prozessen umgehen, ist also fehlertolerant (**fault-tolerant**)
    
*   Verarbeitet Prozesse auf gleichberechtigte Weise, damit alles so schnell wie möglich verarbeitet werden kann (**soft real-time**)
    
*   Sorgt dafür, dass alles stets läuft und skaliert wird (**highly available, non-stop application**)
    
*   Bytecode kann zu jeder Zeit durch neuen ausgetauscht werden (**hot-swappable**)



# Fazit

Wir haben uns heute einen kurzen historischen Überblick über die Entstehung der Programmiersprache Elixir verschafft, deren Grundbausteine schon 1986 durch die Veröffentlichung der von Joe Armstrong entwickelten Programmiersprache Erlang gelegt wurden. Neben Installation und Tooling haben wir in einem weiteren Schritt die BEAM, die Runtime von Elixir, eingeführt und die Behebung eines Fehlers demonstriert sowie den verbesserten Code auf den laufenden Cluster ausgerollt. Die Vorteile, die Elixir in Kombination mit der BEAM mit sich bringt, sind immens und sollten jeden Entwickler dazu bewegen, sich genauer damit auseinander zu setzen.

Im [nächsten](https://b-nova.com/home/content/functional-programming-with-elixir-and-the-beam-de) Teil der Elixir-Serie werden wir einen tieferen Einblick in die Grundsätze der Elixir-Programmierung erhalten und die neuen Kenntnisse direkt an einem Beispiel vertiefen.

