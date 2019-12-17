

|banner|


.. raw:: html

    <embed>
        <h2>The original Trash Guy Script, written in Python!</h2>
    </embed>

|

.. contents:: **Contents**

Installation Instructions
=========================

.. code-block:: bash

    python setup.py install


Usage Examples
==============

**Command line:**

.. code-block:: bash

    python -m trashguy A B C

**Python module:**

.. code-block:: python

    from trashguy import TrashGuy

    print(TrashGuy('A B C'))  # input must be a string
    print(TrashGuy('📂', '📊', '✉️'))  # or a tuple

**Python module as iterator:**

.. code-block:: python

    from trashguy import TrashGuy

    trash_guy = TrashGuy('A B C')

    for _ in range(27):
        print(next(trash_guy))  # raises StopIteration if called when animation is already complete

**Telegram user-bot plugin:**

.. code-block:: python

    from trashguy import TrashGuy, Symbols
    import asyncio

    # {client and handler code omitted}

    user_input = event.message.text  # space delimited input from a given message

    # Specifying keyword 'spacer=Symbols.SPACER_WIDE' prevents telegram from
    # stripping leading spaces in the animation, the default is 'Symbols.SPACER_DEFAULT'.
    # Specifying a value for keyword 'wrap' will wrap each frame of the animation
    # in the provided string.
    trash_animation = TrashGuy(user_input,
                               spacer=Symbols.SPACER_WIDE,
                               wrapper=Symbols.WRAPPER_MONOSPACE)  # single backtick

    for frame in trash_animation:
        asyncio.sleep(0.4)  # external library for sleeping between frames
        await event.edit(frame)  # plays back the animation frame by frame in real time

*Setting custom symbols with keyword arguments and printing as a newline-joined string:*

.. code-block:: python

    from trashguy import TrashGuy, Symbols

    trash_animation = TrashGuy(user_input,
                               sprite_can='\u2A06',
                               sprite_left='<(-.- <)',
                               sprite_right='(> -.-)>',
                               spacer=Symbols.SPACER_EMOJI,
                               wrapper=Symbols.WRAPPER_BLOCK_MONO)  # triple backticks

    print(trash_animation)  # outputs entire animation with each frame separated by newline

|

Environment Setup
=================

.. highlights::
    The environment setup steps are separated into three sections, the Text Editor, the Javascript Platform and the Operating System. Please follow the instructions for each part of the three sections that applies to you in the given order of setup.

Text Editors
------------
Vim
^^^
- Open the vimrc file:

.. code-block:: bash

    vim ~/.vimrc


- Add these lines to the file if they don't exist:

.. code-block::

    set encoding=utf-8  " The encoding displayed.
    set fileencoding=utf-8  " The encoding written to file

- Save and close:

.. code-block::

    :wq

|

Emacs
^^^^^
You can force Emacs to read a file in a specific encoding with ``C-x RET c C-x C-f``. If you opened a file and EMACS determined the encoding incorrectly, you can use ``M-x revert-buffer-with-coding-system``, to reload the file with a named encoding.

You can change the encoding to use for the file when saving using ``C-x C-m f``. You can also force this immediately by using ``C-x C-m c utf-8 RET C-x C-w RET``. You can list all available encodings with ``M-x list-coding-systems``.

You can also mark the entire file with ``C-x h`` and then try ``M-x recode-region``. It will ask you for ``Text was really in`` and ``But was interpreted as``.

|

Notepad++
^^^^^^^^^
You may set the character encoding in Notepad++ as shown in the below image:

.. image:: images/npp.jpg

If doing so still does not display the file correctly, try selecting ``Convert to UTF-8`` and then save the file.
If that still fails also, try selecting ``Convert to UTF-8-BOM`` instead, and save the file.

|

Javascript Platform
---------------
Trash Guy Script was written in ``NodeJS 12``.
Backwards compatibility has not yet been tested.

To get your current NodeJS version type into the terminal:

.. code-block:: bash

    node --version

If the command fails to execute, it's possible that no NodeJS installation exists.
In that case, please download it and install it first `https://nodejs.org/en/download/`

Check the output of this command, it should say ``utf-8``.

.. code-block:: bash

    node -e "console.log(process.stdout._writableState.defaultEncoding)"

**If it returns any other value, try to set the default encoding with one of the following platform specific methods:**

Operating Systems
-----------------
Linux
^^^^^
Type this command to see your current locale settings:

.. code-block:: bash

    locale

In the output of the command, check the variable ``LC_ALL=`` to see if it contains ``UTF-8``.
If it does not, try setting it by using the following commands:

.. code-block:: bash

    locale-gen en_US.UTF-8
    export LANG=en_US.UTF-8 LANGUAGE=en_US.en LC_ALL=en_US.UTF-8

Type the ``locale`` command again to confirm that ``LC_ALL=en_US.UTF-8`` has been set.

To confirm that the default encoding has been successfully set, use the code in the snippet `here. <#python-platform>`_

Android
^^^^^^^
    The Android platform default is always UTF-8, however, if the code file does not display correctly, it may have been corrupted. Try     re-downloading it and try again. If that does not solve the problem, refer to the help documentation of the specific                     application/terminal emulator you are using with regards default encoding.

MacOS
^^^^^
Navigate to ``Terminal -> Preferences`` from Terminal’s menu bar.

.. image:: images/macos1.jpg

In the Preferences window select the ``Settings -> Advanced`` tab.
Then, under the ``Character encoding`` drop-down box, select ``Unicode (UTF-8)`` and tick the box ``Set locale environment variables on startup``.

.. image:: images/macos2.jpg

To confirm that the default encoding has been successfully set, use the code in the snippet `here. <#python-platform>`_

Windows
^^^^^^^
By default it's utf-8 in windows and there is no need to change anything

|

Like what you see?
==================
⭐️ Star the repository and share with your friends! ⭐️


*Really* like what you see?
---------------------------
*Feel free to donate so we can get some marshmallows* 😁

===================  ====
**Donation Method**  **Details**
-------------------  ----
     Amazon          💳 `Donate a Gift Card`_! *(Currently only accepting Amazon.de Gift Cards in Euros)*

                     Click on **Email** and send to **z_donate@protonmail.ch**

                     Or, click on **Share via messaging** and send to **https://t.me/Zacci**
    Bitcoin          1CoRm4mKCUPs5XQnFVSVQ4xGMAp29pyYzC
===================  ====

|

⭐️ Supporters and Contributors
===============================

Special thanks to the folks down at `Telethon Off-topic <https://t.me/telethonofftopic>`_ for their help and support!

.. _`Donate a Gift Card`: https://www.amazon.de/Digitaler-Amazon-Gutschein-Blaues-Amazon/dp/B07Q1JNC7R?language=en_GB

.. |banner| image:: images/banner.png
